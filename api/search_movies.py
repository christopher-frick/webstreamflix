# api/search_movies.py
from http.server import BaseHTTPRequestHandler
from urllib import parse
import requests
from bs4 import BeautifulSoup
import json

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        url_components = parse.urlsplit(self.path)
        query_string_list = parse.parse_qsl(url_components.query)
        query_dict = dict(query_string_list)
        movie_name = query_dict.get("name", "avengers")  # Default to 'avengers' if no name provided

        base_url = "https://torrent9.to"
        search_url = f"{base_url}/search_torrent/films/{movie_name.replace(' ', '-')}.html"
        movies_info = []

        try:
            response = requests.get(search_url)
            soup = BeautifulSoup(response.content, 'html.parser')
            all_tr = soup.select('body > section > div > div > div > div > div.row.cus-row > div.col-sm-12.cus-col.content-left-col > div.left-tab-section > div.table-responsive > table > tbody > tr')
            
            for tr in all_tr:
                seeders_el = tr.select_one('td:nth-child(4) > span')
                leechers_el = tr.select_one('td:nth-child(5) > span')
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

                movies_info.append({
                    'title': title_el['title'] if title_el else "N/A",
                    'img_link': img_link_el,
                    'detail_url': detail_url,
                    'seeders': seeders_el.text if seeders_el else "N/A",
                    'leechers': leechers_el.text if leechers_el else "N/A",
                    'size': size_el.text if size_el else "N/A",
                    'magnet_link': magnet_link_el['href'] if magnet_link_el else "N/A",
                    'description': description_el.text.strip() if description_el else "N/A"
                })

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(movies_info, indent=4).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())
        return
