const TempConverter = ({
  setUnit,
}: {
  setUnit: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
  };

  return (
    <div className="flex flex-col items-center sm:items-end text-white text-sm gap-2">
      <button
        className="w-[100px] py-[2px] rounded-lg bg-pink-900 "
        onClick={() => handleUnitChange("C")}
      >
        Celsius
      </button>
      <button
        className="w-[100px] py-[2px] rounded-lg bg-pink-900 "
        onClick={() => handleUnitChange("F")}
      >
        Fahrenheit
      </button>
    </div>
  );
};

export default TempConverter;
