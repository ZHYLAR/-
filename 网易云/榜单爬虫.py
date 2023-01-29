import requests
import bs4
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0"}
res = requests.get("https://music.163.com/discover/", headers=headers)
soup = bs4.BeautifulSoup(res.text, "html.parser")
targets = soup.find_all("a", class_="nm s-fc0 f-thide")
with open("rankList.txt", "w+", encoding='utf-8') as file:
    file.write('var songList = [')
    for each in targets:    
        file.write("'"+each.text+"'"+',') 
        print(each)
    file.write(']')
file.close


