import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SavedLocations = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (location: string) => {
    const newFavorites = favorites?.filter((fav) => fav !== location);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto">
        <header className="flex items-center">
          <Link
            to="/"
            className="px-5 py-2 m-2 z-[4] font-bold text-md bg-white absolute top-0 rounded-lg"
          >
            <i className="fa-solid fa-chevron-left"></i>{" "}
          </Link>
          <h1 className="w-full text-center text-3xl font-semibold mb-8 py-3 shadow-lg">
            Saved Locations
          </h1>
        </header>
        <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites?.map((location, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md flex justify-between"
            >
              <h2 className="text-xl font-semibold">{location}</h2>
              <button
                className="text-white bg-red-500 px-3 py-1 rounded-lg"
                onClick={() => removeFromFavorites(location)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedLocations;
