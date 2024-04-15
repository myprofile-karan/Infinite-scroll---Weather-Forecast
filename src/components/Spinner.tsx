
const Spinner = () => {
  return (
    <diV className="flex items-center justify-center">
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-t-8 border-b-8 border-gray-200 "></div>
        <div className="absolute top-0 left-0 h-14 w-14 rounded-full border-t-8 border border-blue-500 animate-spin"></div>
      </div>

    </diV>
  );
};

export default Spinner;
