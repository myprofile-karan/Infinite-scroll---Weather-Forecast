import toast from "react-hot-toast";

const addToFavorites = (
  city: any,
  favorites: string[],
  setFavorites: { (value: any): void; (arg0: any[]): void }
) => {
  const exists = favorites.some((fav: string) => fav === city.ascii_name);

  if (!exists) {
    const newFavorites = [...favorites, city.ascii_name];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    toast.success("Location added");
  } else {
    toast.error("Location already exists in favorites");
  }
};

export default addToFavorites;
