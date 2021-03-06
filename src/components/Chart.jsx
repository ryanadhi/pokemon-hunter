/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const Chart = (props) => {
  const data = props.stats.map((item) => item.base_stat);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: 'polarArea',
    data: {
      labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
      datasets: [
        {
          label: null,
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;
