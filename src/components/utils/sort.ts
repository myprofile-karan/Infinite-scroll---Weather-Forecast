import { SetStateAction } from "react";
import { CityData } from "../../types/types";

const handleSort = (
  searchData: any[],
  setSearchData: {
    (value: SetStateAction<CityData[]>): void;
    (arg0: any): void;
  },
  sortBy: string | null,
  setSortBy: any
) => {
  setSortBy(sortBy === "asc" ? "desc" : "asc");
  const sortedData = searchData.slice().sort((a: any, b: any) => {
    if (sortBy === "asc") {
      return a.ascii_name.localeCompare(b.ascii_name);
    } else {
      return b.ascii_name.localeCompare(a.ascii_name);
    }
  });
  setSearchData(sortedData);
};
export default handleSort;
