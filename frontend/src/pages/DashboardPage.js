import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const DashboardPage = () => {
  let { user, authTokens } = useContext(AuthContext);
  let [stocks, setStocks] = useState([]);
  let [stockInfo, setStockInfo] = useState([]);

  const getWatchlist = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/watchlist-retrieve/', {
        headers : {
            Authorization: `Bearer ${authTokens.access}`
        }
      })
      console.log("watchlist retrieved: ", response.data)
      setStocks(response.data.map(stock => stock['ticker']))
    } catch (error) {
      console.error("error fetching data");
    }
  }

  const handleDelete = async (ticker) => {
    try {
      const response = await axios.post('http://localhost:8000/api/watchlist-remove/', {ticker}, {
        headers : {
          Authorization: `Bearer ${authTokens.access}`
        } 
      })
      setStocks(oldStocks => oldStocks.filter(tick => tick !== ticker))
    } catch (error) {
      console.error("failed to delete stock")
    }
  }

  useEffect(() => {
     //when stocks is populated, need to retrieve info for each stock
     const fetchInfo = async() => {
      try {
        const reqs = stocks.map(stock => 
        axios.get('http://localhost:8000/api/stock-info/', {
          params: { input: stock }
        })) 
        const responses = await Promise.all(reqs)
        setStockInfo(responses.map(res => res.data.info))
        console.log("stock info retrieved")
       } catch (error) {
        console.error("failed to fetch stock info ")
       }
     }

     fetchInfo()
    
  }, [stocks])

  useEffect(() => {
    getWatchlist()
  }, [authTokens])

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-start justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Header />

      
      <div className="w-2/3 mt-48">
        <h1 className="text-5xl font-bold text-white mb-8">{user.username.charAt(0).toUpperCase() + user.username.slice(1) }'s Assets</h1>

        <div>
          {stockInfo.map((stock, index) => (
            <div key={index} className="bg-white p-4 rounded-3xl mx-auto my-6 text-xl w-full flex items-center space-x-14" >
              <span className="font-bold">{stock['ticker']}
              <span className="font-bold ml-16">${stock['current-price']}</span>
              </span>
              <span className={`text-md font-bold ml-8 ${
                stock["percent-change"] >= 0
                  ? "text-green-700"
                  : "text-red-700"
              }`}>({stock["percent-change"].toFixed(2)}%)</span>
              <span className="ml-16">Open: <b>${stock['open-price']}</b></span>
              <span className="ml-16">Close: <b>${stock['close-price']}</b></span>
              <span className="ml-16">52 Week Range: <b>${stock['52-high']} - ${stock['52-low']}</b></span>
              <button onClick={() => handleDelete(stock['ticker'])} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>


       

      </div>

    </div>
  );
};

export default DashboardPage;
