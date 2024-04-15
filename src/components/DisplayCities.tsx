import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CityData, Coordinates } from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import fetchData from "./utils/fetchData";
import handleSort from "./utils/sort";
import addToFavorites from "./utils/addToFavorites";

const DisplayCities = () => {
  const [data, setData] = useState<CityData[]>([]);
  const [searchData, setSearchData] = useState<CityData[]>([]);
  const [input, setInput] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(20);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [sortBy, setSortBy] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    fetchData(limit, setSearchData, setData);
  }, [limit]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const search = data?.filter((item) =>
      item.ascii_name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchData(search);
  };

  const fetchMoreData = () => {
    if (data.length >= 100) {
      setHasMore(false);
      return;
    }
    setLimit((prevLimit) => prevLimit + 20);
  };

  const handleWeather = (coordinates: Coordinates, newTab: boolean) => {
    const { lon, lat } = coordinates;
    const url = `/weather?lon=${lon}&lat=${lat}`;
    if (newTab) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    coordinates: Coordinates
  ) => {
    e.preventDefault();
    handleWeather(coordinates, true);
  };


  return (
    <div className="bg-white text-center w-full">
      <header className="flex mb-4 justify-between sm:justify-between items-center flex-wrap px-6 sm:px-10">
        <img
          src={Logo}
          className="w-14 h-14 sm:w-20 mix-blend-multiply"
          alt=""
        />
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          className="my-5 border-2 px-2 py-1 border-gray-300 rounded-lg focus:outline-none"
          placeholder="Search city..."
        />
        <Link to="/savelocations">
          Save Locations <i className="fa-solid fa-chevron-right"></i>{" "}
        </Link>
      </header>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="font-bold text-xl my-5">Loading...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more data to load</b>
          </p>
        }
      >
        <table className="w-full border-collapse shadow-lg bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">
                City Name button
                <i
                  onClick={()=> handleSort(searchData, setSearchData, sortBy, setSortBy)}
                  className="fa-solid fa-sort ms-2 cursor-pointer"
                  title="sort"
                ></i>
              </th>
              <th className="py-3 px-4">Country</th>
              <th className="py-3 px-4">Timezone</th>
              <th className="py-3 px-4">Save Location</th>
            </tr>
          </thead>
          <tbody>
            {searchData?.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                onContextMenu={(e) => handleRightClick(e, item.coordinates)} // Handle right-click event
              >
                <td
                  className="py-3 px-4 cursor-pointer font-semibold text-blue-500"
                  onClick={() => handleWeather(item.coordinates, false)}
                >
                  {item.ascii_name}
                </td>
                <td className="py-3 px-4">{item.cou_name_en}</td>
                <td className="py-3 px-4">{item.timezone}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-gray-300 px-4 py-1 rounded-lg"
                    onClick={() => addToFavorites(item, favorites, setFavorites)}
                  >
                    save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default DisplayCities;
