/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Cities from "./components/Cities";
import Inputs from "./components/Inputs";
import Location from "./components/Location";
import WeatherUpdate from "./components/WeatherUpdate";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";

import { formatBackground, capitalizeFirstLetter } from "./services/utils";
import { tempRanges, weatherConditions } from "./constants/constants";

import Spinner from "./components/Spinner";
import LineChart from "./components/LineChart";

const App = () => {
  const [query, setQuery] = useState({});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");

  const [temperature, setTemperature] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [thresholds, setThresholds] = useState({
    temp: 20,
    condition: "Rain",
  });

  const checkThresholds = () => {
    if (!weather) return;
    if (temperature) {
      const tempExceeded = weather.temp > parseInt(temperature, 10);
      if (tempExceeded) {
        toast.warn(`Temperature exceeds ${thresholds.temp}°C`);
      }
    }
    if (weatherCondition) {
      const conditionMatched = weather.details === weatherCondition;

      if (conditionMatched) {
        toast.warn(`Weather condition matches ${thresholds.condition}!`);
      }
    }
  };

  useEffect(() => {
    if (weather) {
      generateSummary();
    }
  }, [weather]);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    } catch (error) {
      toast.error(
        `Failed to fetch weather data for ${capitalizeFirstLetter(cityName)}`
      );
      console.error("Weather fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setQuery({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setQuery({ q: "Bangalore" });
        }
      );
    } else {
      setQuery({ q: "Bangalore" });
    }
  }, []);

  useEffect(() => {
    if ((query.lat && query.lon) || query.q) {
      setLoading(true);
      getWeather();
    }
  }, [query, units]);

  useEffect(() => {}, [summary]);

  const generateSummary = () => {
    if (!weather) return;

    const tempDesc =
      tempRanges.find(
        (range) => weather.temp >= range.min && weather.temp <= range.max
      )?.desc || "temperate";
    const conditionDesc =
      weatherConditions[weather.details] || "variable conditions";

    const hourlySummary = weather.hourly
      .map((hour, index) => {
        const hourText =
          index === 0
            ? "\nCurrently"
            : `\nIn ${index} hour${index > 1 ? "s" : ""}`;
        return `${hourText}: ${hour.temp}°C`;
      })
      .join(". ");

    const summaryText = `Expect ${tempDesc}. \n${conditionDesc}\n${hourlySummary}.`;

    setSummary(summaryText);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    checkThresholds();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Getting data at fixed interval of time");
      getWeather();
      checkThresholds();
    }, 300000);
    // 300000 milliseconds = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const [formData, setFormData] = useState({
    date: "",
    summary1: "",
    city: "",
  });

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setFormData({
      date: weather.formattedLocalTime,
      summary1: summary,
      city: weather.name,
    });

    try {
      const response = await fetch("http://localhost:8000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();

      toast.success("Summary saved to database");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Summary not saved to database");
    }
  };

  return (
    <>
      <div className="flex-col justify-center">
        <h1 className="bg-black text-white font-bold text-5xl text-center p-5">
          Real-Time Weather Monitoring
        </h1>
        <div className={`flex-col justify-center ${formatBackground(weather)}`}>
          <div className="flex-col justify-center align-middle mx-auto py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Cities setQuery={setQuery} />
                <Inputs
                  setQuery={setQuery}
                  setUnits={setUnits}
                  currUnit={units}
                />
                {weather && (
                  <>
                    <Location weather={weather} />
                    <WeatherUpdate weather={weather} units={units} />
                    <Forecast
                      title="3 hour step forecast"
                      data={weather.hourly}
                    />
                    <Forecast title="daily forecast" data={weather.daily} />
                  </>
                )}
              </>
            )}
            <ToastContainer
              autoClose={1500}
              hideProgressBar={true}
              theme="colored"
            />

            <div className="flex-col mt-10 items-center justify-center w-2/4 p-8 rounded-xl shadow-2xl bg-white/30 backdrop-blur-md border border-gray-300/30 mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Threshold
              </h2>
              <form
                onSubmit={handleSubmit}
                className="w-full p-6 bg-white/80 rounded-lg shadow-lg backdrop-blur-md border border-gray-200"
              >
                <div className="mb-6">
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    placeholder="Enter temperature"
                    value={temperature}
                    required
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="weatherCondition"
                    name="weatherCondition"
                    placeholder="Enter Weather Condition"
                    value={weatherCondition}
                    onChange={(e) => setWeatherCondition(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="flex-1 ml-4 mt-12 flex space-x-4">
              <div
                className="flex flex-col p-6 bg-gray-50 rounded-md shadow-md"
                style={{ flex: 1 }}
              >
                <h1 className="text-2xl font-medium text-gray-800 mb-4">
                  Summary
                </h1>
                <p className="text-gray-700 text-lg mb-4 whitespace-pre-wrap">
                  {summary}
                </p>
                <button
                  className="mt-auto px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-200"
                  onClick={handleSubmit1}
                >
                  Save
                </button>
              </div>

              <div
                className="flex items-center justify-center p-6 bg-gray-50 rounded-md shadow-md"
                style={{ flex: 1 }}
              >
                <LineChart value={weather} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
