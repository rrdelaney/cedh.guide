import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  SubTitle,
  Title,
  Tooltip,
} from 'chart.js';
import { memo, useEffect, useState } from 'react';

Chart.register(
  ArcElement,
  DoughnutController,
  Legend,
  Tooltip,
  Title,
  SubTitle
);

interface DoughnutChartProps {
  title: string;
  subtitle?: string;
  display?: 'percent';
  data: { [key: string]: number };
}

export const DoughnutChart = memo(
  function DoughnutChart({
    data,
    display,
    title,
    subtitle,
  }: DoughnutChartProps) {
    const [chartEl, setChartEl] = useState<HTMLCanvasElement | null>(null);

    useEffect(() => {
      if (chartEl == null) return;

      const chart = new Chart(chartEl, {
        type: 'doughnut',
        options: {
          plugins: {
            legend: { display: true, labels: { color: 'white' } },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label ?? '';
                  if (label) label += ': ';
                  label += context.label;

                  return label;
                },
              },
            },
            title: {
              display: true,
              text: title,
              color: 'white',
              font: {
                size: 20,
                family: 'Inter',
              },
            },
            subtitle: {
              display: !!subtitle,
              text: subtitle ?? '',
              color: 'white',
              font: {
                style: 'italic',
              },
            },
          },
        },
        data: {
          labels: Object.entries(data).map(([key, value]) => {
            let label = key;
            if (display === 'percent') {
              label += ` (${value}%)`;
            } else {
              label += ` (${value})`;
            }

            return label;
          }),
          datasets: [
            {
              label: title,
              data: Object.values(data),
              backgroundColor: [
                'rgb(153, 0, 0)',
                'rgb(226, 71, 45)',
                'rgb(233, 148, 48)',
                'rgb(248, 220, 171)',
              ],
              hoverOffset: 4,
            },
          ],
        },
      });

      return () => chart.destroy();
    }, [chartEl, data, display, subtitle, title]);

    return (
      <div className="relative w-full max-w-sm mx-auto">
        <canvas ref={setChartEl} />
      </div>
    );
  },
  function propsAreEqual(
    { data: prevData, ...prevProps },
    { data: nextData, ...nextProps }
  ) {
    return (
      JSON.stringify(prevData) === JSON.stringify(nextData) &&
      Object.keys(prevProps).length === Object.keys(nextProps).length &&
      Object.keys(nextProps).every((key) =>
        Object.is(
          prevProps[key as keyof typeof nextProps],
          nextProps[key as keyof typeof nextProps]
        )
      )
    );
  }
);
