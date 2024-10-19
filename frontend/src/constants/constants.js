const tempRanges = [
  {
    min: -10,
    max: 0,
    desc: "Extreme cold alert! Limit outdoor time and dress in multiple layers. Be cautious of frostbite and take frequent indoor breaks. Check on vulnerable neighbors.",
  },
  {
    min: 1,
    max: 10,
    desc: "Cold day ahead with a minimum of 1 degree. Dress warmly in layers and watch for wind chill. Be careful on icy surfaces and consider indoor activities.",
  },
  {
    min: 11,
    max: 20,
    desc: "Mild weather with a high of 20 degrees. Ideal for outdoor activities. Keep a light jacket handy for the morning or evening chill.",
  },
  {
    min: 21,
    max: 30,
    desc: "Warm day! Stay hydrated and wear sunscreen if outdoors. Light clothing is best, and seek shade during peak sun hours",
  },
  {
    min: 31,
    max: 40,
    desc: "Hot day ahead. Stay hydrated, avoid prolonged sun exposure, and wear loose-fitting clothing. Find shade when outdoors.",
  },
  {
    min: 41,
    max: 50,
    desc: "Extreme heat warning! Stay indoors as much as possible. Hydrate frequently and avoid outdoor activities during peak sunlight hours. Watch for signs of heat exhaustion",
  },
];

const weatherConditions = {
  Mist: "Cool weather with mist. Visibility may be low, so drive carefully and watch for pedestrians. If possible, stay indoors, and if you go out, wear warm clothes and be cautious of slippery spots.",
  Clear: "Mild weather with clear skies. A perfect day for outdoor activities.",
  Clouds:
    "Overcast skies. Ideal for indoor activities or a walk with a light jacket, but be prepared for possible rain",
  Haze: "Mild weather with hazy skies. Visibility may be reduced, so take it easy outdoors and stay hydrated",
  Rain: "Cool weather with rain showers. Don't forget your umbrella or raincoat, and be careful of wet, slippery surfaces.",
  thunderstorm:
    "Cool weather with thunderstorms. Seek shelter indoors and avoid using electrical appliances. Stay clear of tall objects and open fields.",
  snowy:
    "Cold weather with snowfall. Dress warmly in layers and watch for slippery roads and sidewalks. If traveling, allow extra time and drive carefully",
};

export { tempRanges, weatherConditions };
