import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ value }) => {
  const daily = value?.daily || [];
  const labels = daily.map(day => day.title);
  const dataPoints = daily.map(day => day.temp);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: dataPoints,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 3, // Increased border width
        pointRadius: 5, // Increased point size
        pointBackgroundColor: "rgba(75,192,192,1)", // Point color
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div
      className="mt-10 p-4 rounded-lg shadow-md"
      style={{
        width: '600px',
        height: '400px',
        backgroundColor: '#f9f9f9', // Light background color
        border: '2px solid rgba(75,192,192,1)', // Border around the chart
        borderRadius: '10px',
      }}
    >
      <h2 className="text-xl font-semibold text-center mb-4" style={{ color: 'rgba(75,192,192,1)' }}>
        Daily Temperature Chart
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
