import React from "react";
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

const data = [
  {
    name: "Page A",
    Expense: 4000,
    Income: 2400,
  },
  {
    name: "Page B",
    Expense: 3000,
    Income: 1398,
  },
  {
    name: "Page C",
    Expense: 2000,
    Income: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Expense: 2780,
    Income: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Expense: 1890,
    Income: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Expense: 2390,
    Income: 3800,
  },
  {
    name: "Page G",
    Expense: 3490,
    Income: 4300,
  },
];

export default function Chart() {
  return (
    <ResponsiveContainer width={"100%"} aspect={3}>
      <LineChart
        className="text-white"
        // width={1000}
        // height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Income"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
