# api/search_movies.py
from http.server import BaseHTTPRequestHandler
from urllib import parse
import requests
from bs4 import BeautifulSoup
import json
import redis
import os

# Initialize Redis client using URL
redis_url = os.getenv("KV_URL")  # Ensure you've added KV_URL to your Vercel environment variables
redis_client = redis.from_url(redis_url)

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        url_components = parse.urlsplit(self.path)
        query_string_list = parse.parse_qsl(url_components.query)
        query_dict = dict(query_string_list)
        movie_name = query_dict.get("name", "avengers")  # Default to 'avengers' if no name provided

        base_url = "https://torrent9.to"
        search_url = f"{base_url}/search_torrent/films/{movie_name.replace(' ', '-')}.html"
        movies_info = []
        cache_key = f"movie_info_{movie_name}"

        # Try to get cached response
        cached_response = redis_client.get(cache_key)
        if cached_response:
            # Send cached response if available
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(cached_response)
            return
        
        try:
            response = requests.get(search_url)
            soup = BeautifulSoup(response.content, 'html.parser')
            all_tr = soup.select('body > section > div > div > div > div > div.row.cus-row > div.col-sm-12.cus-col.content-left-col > div.left-tab-section > div.table-responsive > table > tbody > tr')
            
            for tr in all_tr:
                seeders_el = tr.select_one('td:nth-child(4) > span')
                leechers_el = tr.select_one('td:nth-child(5)')
                size_el = tr.select_one('td:nth-child(3)')
                title_el = tr.select_one('td:nth-child(1) > a')
                magnet_link_el = None
                description_el = None
                img_link_el = None

                if title_el:
                    detail_url = base_url + title_el['href']
                    detail_response = requests.get(detail_url)
                    detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                    magnet_link_el = detail_soup.select_one('a[href^="magnet:"]')
                    description_el = detail_soup.select_one('p.description_torrent')
                    img_el = detail_soup.select_one('div.movie-img > img')

                    if img_el:  # Check if img element exists
                        img_link_el = base_url + img_el['src']  # Use 'src' attribute for images

                # seeders in a int
                seeders_el = int(seeders_el.text.strip()) if seeders_el else 0
                # leechers in a int
                leechers_el = int(leechers_el.text.strip()) if leechers_el else 0
                
                if seeders_el > 0:
                    movies_info.append({
                        'title': title_el['title'] if title_el else "N/A",
                        'img_link': img_link_el,
                        'detail_url': detail_url,
                        'seeders': seeders_el,
                        'leechers': leechers_el,
                        'size': size_el.text if size_el else "N/A",
                        'magnet_link': magnet_link_el['href'].strip() if magnet_link_el else "N/A",
                        'description': description_el.text.strip() if description_el else "N/A",
                        'ratio': round(seeders_el / leechers_el, 2) if leechers_el > 0 else 0
                    })

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            # reorder movies_info ration from high to low
            movies_info = sorted(movies_info, key=lambda x: x['ratio'], reverse=True)
            # Cache the new result
            redis_client.setex(cache_key, 604800, json.dumps(movies_info))  # 604800 seconds = 1 week
            self.wfile.write(json.dumps(movies_info, indent=4).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())
        return
