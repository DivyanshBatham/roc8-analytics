import { Fragment, MouseEvent, useEffect, useRef } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Navbar from "@/components/Navbar";
// import { Chart } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  InteractionItem,
  BarController,
  LineController,
} from "chart.js";

import {
  Chart,
  Line,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Feature-wise total timespent",
    },
  },
};

const labels = [
  "Feature A",
  "Feature B",
  "Feature C",
  "Feature D",
  "Feature E",
  "Feature F",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Total timespent",
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: labels.map(() => 100),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: "Dataset 2",
    //   // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   data: labels.map(() => 50),
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export default function Example() {
  const chartRef = useRef<ChartJS>(null);
  const lineChartRef = useRef<ChartJS>(null);

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    console.log({ event });

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32"></div>

        <main className="-mt-32">
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Roc8 Analytics
              </h1>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <Chart
                ref={chartRef}
                type="bar"
                options={options}
                data={data}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <Line
                // ref={lineChartRef}
                options={options}
                data={data}
                onClick={handleClick}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
