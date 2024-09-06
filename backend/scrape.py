import requests
from bs4 import BeautifulSoup
import re

def get_price(sym):
    url = f'https://www.cnbc.com/quotes/{sym}'
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    price_element = soup.find('span', class_='QuoteStrip-lastPrice')
    return price_element.text

def get_day_change(sym):
    url = f'https://www.cnbc.com/quotes/{sym}'
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    span_parent = soup.find('span', class_='QuoteStrip-changeDown')  # get change down to work too
    if span_parent is None:
        span_parent = soup.find('span', class_='QuoteStrip-changeUp')
    pctg_text = span_parent.find_all('span')[1].text  # results in format of (<!-- -->-1.34%<!-- -->), use regex
    return re.search(r'-?\d+\.?\d*%', pctg_text).group()

def get_trending_stocks():
    url = 'https://finance.yahoo.com/markets/stocks/trending/'
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    tickers = soup.find_all('span', class_='symbol yf-ravs5v')
    return f'{tickers[0].text}\t{tickers[1].text}\t{tickers[2].text}\t{tickers[3].text}'



