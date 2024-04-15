const fetchData = async (
  limit: number,
  setSearchData: (data:any)=> void,
  setData:(data:any)=> void
) => {
  try {
    const response = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`
    );
    const jsonData = await response.json();    
    setSearchData(jsonData.results);
    setData(jsonData.results);
    console.log(jsonData.results);
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
