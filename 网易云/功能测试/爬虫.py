import requests
import bs4
def get_url(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0"}
    res = requests.get(url,headers=headers)
    return res
def main():
    url = input("url:")
    res = get_url(url)
    with open("res.txt","w",encoding="utf-8") as file:
        file.write(res.text)     
if __name__ == "__main__":
    main()