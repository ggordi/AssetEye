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
            'eps': res['trailingEps'],
            'news': {
                        0: {'link': get_news(ticker)[0]['link'], 'title': get_news(ticker)[0]['title'], 'publisher': get_news(ticker)[0]['publisher']}, 
                        1: {'link': get_news(ticker)[1]['link'], 'title': get_news(ticker)[1]['title'], 'publisher': get_news(ticker)[1]['publisher']}, 
                        2: {'link': get_news(ticker)[2]['link'], 'title': get_news(ticker)[2]['title'], 'publisher': get_news(ticker)[2]['publisher']}
                    }
            }

    # implement summarization API to summarize the business summary and news articles

# print(sorted(yf.Ticker('MSFT').info.keys()))
# print(stock_info('AAPL'))

print(get_news('MSFT')[0].keys())
