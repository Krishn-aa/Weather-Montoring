const formatBackground = (weather) => {
  if (!weather) return "from-cyan-600 to-blue-700";
  const { details } = weather;

  switch (details) {
    case "Clear":
      return "from-yellow-400 to-orange-700";
    case "Clouds":
      return "from-gray-400 to-gray-800";
    case "Rain":
      return "from-blue-400";
    case "Snow":
      return "from-blue-400 to-blue-200";
    case "Mist":
      return "from-yellow-100 to-orange-700";
    case "Haze":
      return "from-purple-400 to-purple-700";
    case "Thunderstorm":
      return "from-yellow-300 to-gray-700";
    case "Drizzle":
      return "from-green-400 to-blue-700";
    case "Smoke":
      return "from-gray-300 to-gray-500";
    default:
      return "from-cyan-600 to-blue-700";
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { formatBackground, capitalizeFirstLetter };