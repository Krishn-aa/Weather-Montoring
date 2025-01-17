const Location = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-medium mr-8">{`${name},${country}`}</p>
      </div>
    </div>
  );
};

export default Location;