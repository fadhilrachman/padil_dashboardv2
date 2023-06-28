import React from "react";
import Title from "../components/Title";
import BaseInput from "../components/form/BaseInput";
import BaseButton from "../components/form/BaseButton";
import BaseTable from "../components/BaseTable";
import Column from "../utils/interfaces/column";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Chart from "./Chart";
import Example from "./Example";
const Dashboard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div>
      <Title title="Dashboard" />
      <p className="mt-7">Lorem ipsum dolor sit amet </p>
      <small className="opacity-50">Today vs 7 day ago</small>
      <div className="text-white mt-5 grid grid-cols-3 gap-5">
        <div className="bg-[#0329E8] rounded-lg px-6 py-4  ">
          <div className="flex justify-between items-center">
            <h1 className="text-[17px]">Money</h1>
            <i className="bx bx-coin text-[17px]"></i>
          </div>
          <h1 className="text-[45px] font-semibold  mt-4">
            <CountUp start={0} end={270000} duration={3} />
          </h1>
          <div className="font-normal mt-3 flex justify-between items-center text-green-500">
            <span>+3,840 (26,80%)</span>
            <i className="bx bxs-caret-up-circle"></i>
          </div>
        </div>
        <div className="bg-[#1A1E30] rounded-lg px-6 py-4  ">
          <div className="flex justify-between items-center">
            <h1 className="text-[17px]">Income</h1>
            <i className="bx bx-coin text-[17px]"></i>
          </div>
          <h1 className="text-[45px] font-semibold  mt-4 text-sky-400">
            <CountUp start={0} end={30000} duration={2.8} />
          </h1>
          <div className="font-normal mt-3 flex justify-between items-center text-green-500">
            <span>+3,840 (26,80%)</span>
            <i className="bx bxs-caret-up-circle"></i>
          </div>
        </div>

        <div className="bg-[#1A1E30] rounded-lg px-6 py-4  ">
          <div className="flex justify-between items-center">
            <h1 className="text-[17px]">Expense</h1>
            <i className="bx bx-coin text-[17px]"></i>
          </div>
          <h1 className="text-[45px] font-semibold  mt-4 text-sky-400">
            <CountUp start={0} end={27000} duration={2.5} />
          </h1>
          <div className="font-normal mt-3 flex justify-between items-center text-red-500">
            <span>+3,840 (26,80%)</span>
            <i className="bx bxs-caret-up-circle rotate-180"></i>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
        <Chart />
      </div>
      <div className="w-7/12  mt-10 bg-[#1A1E30] rounded-lg px-6 py-4 ">
        <h3 className="text-2xl">Article Statis</h3>
        <Example />
      </div>
    </div>
  );
  5;
};

export default Dashboard;
