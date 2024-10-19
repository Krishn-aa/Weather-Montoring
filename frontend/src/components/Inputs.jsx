import { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits, currUnit}) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleGeoClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div>

      <div className="flex flex-row items-center justify-center gap-10">
        <button
          className={`font-bold py-2 px-8 rounded transition ease-out hover:scale-125 ${
            currUnit === "metric" ? "bg-blue-700 text-white scale-125" : "bg-blue-300 text-white"
          }`}
          onClick={() => setUnits("metric")}
        >
          °C
        </button>

        <button
          className={`font-bold py-2 px-8 rounded transition ease-out hover:scale-125 ${
            currUnit === "imperial" ? "bg-blue-700 text-white scale-125" : "bg-blue-300 text-white"
          }`}
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>

      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4 mx-11">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="City"
            className="rounded-lg text-gray-500 text-xl font-light p-3 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
          />
          <BiSearch
            size={32}
            className="cursor-pointer ease-out hover:scale-125"
            onClick={handleSearchClick}
          />
          <BiCurrentLocation
            size={32}
            className="cursor-pointer ease-out hover:scale-125"
            onClick={handleGeoClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Inputs;
