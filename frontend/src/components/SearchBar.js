import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios"


const SearchBar = () => {
    let [input, setInput] = useState("")
    let [stockInfo, setStockInfo] = useState("")

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(input)

        try {
            // Send request to the backend
            const response = await axios.get('http://localhost:8000/api/stock-info/', {
                params: { input: input } // Sending the input as a query parameter
            });

            // Log the response data
            let info_dict = response.data.info
            console.log(info_dict)
            setStockInfo(info_dict)
        } catch (error) {
            console.error("Error fetching stock info:", error);
            setStockInfo("Invalid Query")
        }

        // send request to the backend, retrieve json response with stock info
    }

    return (
        // Wrapper for the search bar
        <div className="relative w-full max-w-lg">
            {/* Search Bar Form */}
            <form onSubmit={handleSearch} className="relative">
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

            {/* Stock Information Card */}
            {stockInfo && (
                <div
                    className="fixed right-0 top-0 h-full w-3/4 flex items-center justify-center"
                    style={{ zIndex: 1000 }} // Ensure it appears above other content
                >
                    <div className="w-[48rem] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                        <h2 className="text-2xl font-semibold mb-2">
                            {stockInfo['ticker']} - {stockInfo['name']}
                        </h2>

                        <h2 className={`text-3xl font-bold ${stockInfo['percent-change'] >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            ${stockInfo['current-price'].toLocaleString()}
                            <span className="ml-8 text-base">
                                ({stockInfo['percent-change'].toFixed(2)}%)
                            </span>
                        </h2>

                        <p className="text-gray-700 text-lg font-bold mt-3">Key Statistics</p>
                        <p className="text-gray-700">P/E: {stockInfo['trailing-pe'].toFixed(2)}</p>
                        <p className="text-gray-700">Market Cap: {stockInfo['market-cap'].toLocaleString()}</p>
                        <p className="text-gray-700">EPS: {stockInfo['eps'].toFixed(2)}</p>

                        <p className="text-gray-700 text-lg font-bold mt-3">About</p>

                        {/* Scrollable "About" Section */}
                        <div className="max-h-64 overflow-y-auto">
                            <p className="text-gray-700">{stockInfo['description']}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar