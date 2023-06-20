import React from "react";
import Title from "../components/Title";
import BaseInput from "../components/form/BaseInput";
import BaseButton from "../components/form/BaseButton";
import BaseTable from "../components/BaseTable";
import Column from "../utils/interfaces/column";

const Dashboard = () => {
  const column: Column[] = [
    {
      title: "Tanggal",
      index: "tanggal",
    },
    {
      title: "Total Pengeluaran",
      index: "total_pengeluaran",
    },
    {
      title: "Kategori",
      index: "kategori",
    },
    {
      title: "Deskripsi",
      index: "deskripsi",
    },
  ];
  const data = [
    {
      tanggal: "2012-04-12",
      total_pengeluaran: 1200,
      kategori: "hanco",
      deskripsi: "coo",
    },
  ];
  return (
    <div>
      <Title title="Data Customer" />
      <div className="mt-5 flex justify-between">
        <BaseInput placeholder="Search..." />
        <BaseButton>Create Data</BaseButton>
      </div>
      <BaseTable className="mt-5" column={column} data={data} />
    </div>
  );
};

export default Dashboard;
