import { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import AuthContext from '../context/AuthContext';

const SearchBar = () => {
  let { authTokens } = useContext(AuthContext);
  let [input, setInput] = useState("");
  let [stockInfo, setStockInfo] = useState("");
  let [inWatchlist, setInWatchlist] = useState(false)


  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/stock-info/",
        {
          params: { input: input },
        }
      );
      let info_dict = response.data.info;
      console.log(info_dict);
      setStockInfo(info_dict);
    } catch (error) {
      console.error("Error fetching stock info:", error);
      setStockInfo("Invalid Query");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/watchlist-add/",
        { ticker: stockInfo['ticker'], name: stockInfo['name'] },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,  // Pass the token for authenticated request
            'Content-Type': 'application/json', // Ensure content type is JSON
          }
        }
      );
      console.log(response);
      setInWatchlist(true)
    } catch (error) {
      console.error("Error adding to watchlist");
    }
  }

  useEffect(() => {
    const fetchStockInfo = async (ticker) => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/stock-info/",
          {
            params: { input: ticker }, // Sending the input as a query parameter
          }
        );
        setStockInfo(response.data.info); // Update state with fetched stock data
        setInput("NVDA");
      } catch (error) {
        console.error("Error fetching data");
      }
    };

    fetchStockInfo("NVDA");
  }, []);

  useEffect(() => { // when the stock info changes, check if the stock is in the user's watchlist for the button conditional rendering 
    const checkInWatchlist = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/watchlist-retrieve/', {
          headers : {
              Authorization: `Bearer ${authTokens.access}`
          }
        })
        let stockList = response.data.map(stock => stock['ticker'])
        if (stockList.includes(stockInfo['ticker'])) {
          setInWatchlist(true)
        } else {
          setInWatchlist(false)
        }
      } catch (error) {
        console.error("check in watchlist failed")
      }
    }

    checkInWatchlist()
  }, [stockInfo])

  return (
    <div className="flex h-[500px]">
      {/* Left Column */}
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold -mb-8">Explore Assets</h1>
        <form onSubmit={handleSearch} className="relative mb-4 w-1/2 -ml-6">
          <input
            className="w-full py-4 pl-6 pr-16 text-lg bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none"
            placeholder="Search for an asset here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500"
          >
            <FaSearch size={20} />
          </button>
        </form>

        {/* News Section */}
        {stockInfo && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 w-3/4 mt-16 -ml-6">
            <h2 className="text-xl font-semibold mb-2">
              Today's {stockInfo["name"]} News
            </h2>
            <h1 className="text-lg mb-4">
              ➤ {stockInfo["news"][0]["title"]}{" "}
              <a
                href={stockInfo["news"][0]["link"]}
                className="text-blue-500 underline text-base"
              >
                {stockInfo["news"][0]["publisher"]}
              </a>
            </h1>
            <h1 className="text-lg mb-4">
              ➤ {stockInfo["news"][1]["title"]}{" "}
              <a
                href={stockInfo["news"][1]["link"]}
                className="text-blue-500 underline text-base"
              >
                {stockInfo["news"][1]["publisher"]}
              </a>
            </h1>
            <h1 className="text-lg mb-4">
              ➤ {stockInfo["news"][2]["title"]}{" "}
              <a
                href={stockInfo["news"][2]["link"]}
                className="text-blue-500 underline text-base"
              >
                {stockInfo["news"][2]["publisher"]}
              </a>
            </h1>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-1/2 pb-36">
        {/* Stock Information Card */}
        {stockInfo && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-5/6 -mt-24 -ml-12">
            <h2 className="text-2xl font-semibold mb-2">
              {stockInfo["ticker"]} - {stockInfo["name"]}
            </h2>

            <h2
              className={`text-3xl font-bold ${
                stockInfo["percent-change"] >= 0
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              ${stockInfo["current-price"].toLocaleString()}
              <span className="ml-8 text-base">
                ({stockInfo["percent-change"].toFixed(2)}%)
              </span>
            </h2>

            <p className="text-gray-700 text-lg font-semibold mt-3 underline">
              Key Statistics
            </p>
            <p className="text-gray-700">
              <b>P/E: </b>
              {typeof stockInfo["trailing-pe"] === "number"
                ? stockInfo["trailing-pe"].toFixed(2)
                : "N/A"}
            </p>
            <p className="text-gray-700">
              <b>Market Cap:</b> {stockInfo["market-cap"].toLocaleString()}
            </p>
            <p className="text-gray-700">
              <b>EPS:</b> {stockInfo["eps"].toFixed(2)}
            </p>
            <p className="text-gray-700">
              <b>52 Week High:</b> ${stockInfo["52-high"].toFixed(2)}
            </p>
            <p className="text-gray-700">
              <b>52 Week Low:</b> ${stockInfo["52-low"].toFixed(2)}
            </p>
            <p className="text-gray-700">
              <b>Gross Margin:</b> {(stockInfo["gm"] * 100).toFixed(2)}%
            </p>
            <p className="text-gray-700">
              <b>Net Margin:</b> {(stockInfo["profit-m"] * 100).toFixed(2)}%
            </p>

            <p className="text-gray-700 text-lg font-semibold mt-3 underline">
              About
            </p>

            {/* Scrollable "About" Section */}
            <div className="max-h-64 overflow-y-auto">
              <p className="text-gray-700">{stockInfo["description"]}</p>
            </div>

            { inWatchlist ? 
              <button onClick={handleAdd} className="w-1/8 ml-60 px-3 py-2 -mb-2 bg-green-700 text-white font-semibold text-sm rounded-xl shadow-md mt-4 hover:cursor-default">
                Stock in watchlist ✓ 
              </button> 
                : 
              <button onClick={handleAdd} className="w-1/8 ml-60 px-3 py-2 -mb-2 bg-black text-white font-semibold text-sm rounded-xl shadow-md hover:bg-blue-800 transition duration-300 mt-4">
                Add to Watchlist
              </button>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
