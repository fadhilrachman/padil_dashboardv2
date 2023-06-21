import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import BaseTable from "../../components/BaseTable";
import Column from "../../utils/interfaces/column";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook";
import ModalDelete from "../../components/ModalDelete";
import toast, { Toaster } from "react-hot-toast";
import { deleteDataIncome, getDataIncome } from "../../redux/income";
import { convertDate, formatNumber } from "../../utils";
import Category from "../../utils/interfaces/category";

interface Modal {
  show: boolean;
  id: string;
}
const ListDataIncome = () => {
  const [modal, setModal] = useState<Modal>({
    show: false,
    id: "",
  });
  const dispatch = useAppDispatch();
  const income = useAppSelector((state) => state.income);
  const dataIncome = income.data;
  // console.log(modal);

  const column: Column[] = [
    {
      title: "Income Date",
      index: "tanggal",
      render: (val: string) => <>{convertDate(val)}</>,
    },
    {
      title: "Income ",
      index: "total_pemasukan",
      render: (val: number) => <>{`Rp.${formatNumber(val)}`}</>,
    },
    {
      title: "Category",
      index: "kategori",
      render: (val: Category) => {
        return <span>{val.nama}</span>;
      },
    },
    {
      title: "Description",
      index: "deskripsi",
      render: (val: string) => {
        const arr: string[] = val?.split("\n");
        return arr?.map((val: string) => (
          <>
            <span>{val}</span>
            <br />
          </>
        ));

        console.log({ arr });
      },
    },

    {
      title: "Action",
      index: "action",
      render: (v: any, val: any) => {
        return (
          <div>
            <Link to={`/category-update/${val._id}`}>
              <span className="text-sky-400 underline mr-2 hover:cursor-pointer">
                Update
              </span>
            </Link>
            <span
              className="text-red-500 underline hover:cursor-pointer"
              onClick={() => setModal({ id: val._id, show: true })}
            >
              Delete
            </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getDataIncome());
  }, []);

  const handleDelete = async () => {
    await dispatch(deleteDataIncome(modal.id));
    setModal({ show: false, id: "" });
    dispatch(getDataIncome());
    toast("Succes Delete Data ✔️", {
      // icon: "👏",
      style: {
        borderRadius: "10px",
        padding: "10px 10px",
        background: "#171B2D",
        boxShadow: "0 4px 8px 0 #ADB3CC",
        color: "#ADB3CC",
      },
    });
  };

  return (
    <div>
      <Title title="Data Income" />
      <div className="mt-5 flex justify-between">
        <BaseInput placeholder="Search..." />
        <Link to="/income-create">
          <BaseButton>Create Data</BaseButton>
        </Link>
      </div>

      <BaseTable
        loading={income.status === "loading"}
        className="mt-5"
        column={column}
        data={dataIncome}
      />
      <ModalDelete
        show={modal.show}
        destroy={handleDelete}
        onHide={() => setModal({ show: false, id: "" })}
      />
      <Toaster
        position="top-right"
        containerClassName=""
        reverseOrder={false}
      />
    </div>
  );
};

export default ListDataIncome;
