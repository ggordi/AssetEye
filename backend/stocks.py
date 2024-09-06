# file for retrieving stock information using yfinance, bs4 was too slow. 
import yfinance as yf


def get_news(ticker):
    return yf.Ticker(ticker).news
    # to access a specific link, do [0] to get the first news entry and then ['link']


def stock_info(ticker):
    res = yf.Ticker(ticker).info
    info_dict = dict()  # have key/value pairs for current price, trailing p/e, open, close
    return {'ticker': ticker, 'name': res['longName'], 'sector': res['sector'],'current-price': res['currentPrice'], 'trailing-pe': res['trailingPE'], 'open-price': res['open'], 'close-price': res['previousClose'], 'market-cap': res['marketCap'],
            'description': res['longBusinessSummary'], 
            'percent-change': (res['currentPrice']-res['open'])/res['open']*100,
            'eps': res['trailingEps']
            }

    # implement summarization API to summarize the business summary and news articles

print(sorted(yf.Ticker('MSFT').info.keys()))
# print(stock_info('AAPL'))
