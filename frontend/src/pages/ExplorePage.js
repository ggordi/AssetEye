import SearchBar from '../components/SearchBar'
import { useState, useEffect } from "react";
import axios from 'axios'
import Header from '../components/Header'

const ExplorePage = () => {

    let [trending, setTrending] = useState("")

    useEffect(() => {
        const getTrending = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/get-trending-stocks/")
                setTrending(response.data["trending stocks"])
            } catch (error) {
                console.error("Error fetching trending stocks:", error);
                setTrending("Server Error.")
            }
        }

        getTrending()
    }, [])

    return (

        <div>
            <div>
                <Header />
            </div>

            <div
                className="min-h-screen bg-cover bg-center flex "
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                }}
            >

                {/* Left side container for title and search bar */}
                <div className="flex-1 ml-72 mb-36 flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-white mb-8">
                        Explore Assets
                    </h1>

                    <h2 className="text-xl font-medium text-white mb-4">
                        Trending today: {trending}
                    </h2>

                    {/* Render SearchBar component */}
                    <SearchBar />
                </div>
            </div>

        </div>
    );

}

export default ExplorePage