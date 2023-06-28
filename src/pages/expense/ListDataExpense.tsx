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
import { deleteDataExpense, getDataExpense } from "../../redux/expense";
import { convertDate, formatNumber } from "../../utils";
import Category from "../../utils/interfaces/category";
import { QueryFilter } from "../../utils/interfaces";
import BaseSelect from "../../components/form/BaseSelect";

interface Modal {
  show: boolean;
  id: string;
}
const ListDataExpense = () => {
  const [modal, setModal] = useState<Modal>({
    show: false,
    id: "",
  });
  const [param, setParam] = useState<QueryFilter>({
    search: "",
    limit: 5,
    page: 1,
  });
  const dispatch = useAppDispatch();
  const expense = useAppSelector((state) => state.expense);
  const dataexpense = expense.result.data;
  const pagination = expense.result.pagination;

  console.log(pagination);

  const column: Column[] = [
    {
      title: "Income Date",
      index: "tanggal",
      render: (val: string) => <>{convertDate(val)}</>,
    },
    {
      title: "Income ",
      index: "total_pengeluaran",
      render: (val: number) => <>{`Rp.${formatNumber(val)}`}</>,
    },
    {
      title: "Category",
      index: "kategori",
      render: (val: Category) => {
        return <span>{val?.nama}</span>;
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
      },
    },

    {
      title: "Action",
      index: "action",
      render: (v: any, val: any) => {
        return (
          <div>
            <Link to={`/expense-update/${val._id}`}>
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
  // let angka: number = 7;

  useEffect(() => {
    dispatch(getDataExpense(param));
  }, [param]);

  const handleDelete = async () => {
    await dispatch(deleteDataExpense(modal.id));
    setModal({ show: false, id: "" });
    dispatch(getDataExpense(param));
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

  const handleLimit = (e: any) => {
    if (
      Math.ceil(Number(expense.result.count) / e.target.value) <
      Number(pagination?.total_page)
    ) {
      return setParam({
        ...param,
        page: Math.ceil(Number(expense.result.count) / e.target.value),
        limit: e.target.value,
      });
    }
    setParam({ ...param, limit: e.target.value });
  };

  return (
    <div>
      <Title title="Data Expense" />
      <div className="mt-5 flex justify-between">
        <div className="flex">
          <BaseInput
            placeholder="Search..."
            onChange={(e) =>
              setParam({ search: e.target.value, page: 1, limit: 5 })
            }
            value={param.search}
          />
          <BaseSelect
            className="ml-3"
            value={param.limit?.toString()}
            onChange={(e) => handleLimit(e)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </BaseSelect>
        </div>
        <Link to="/expense-create">
          <BaseButton>Create Data</BaseButton>
        </Link>
      </div>

      <BaseTable
        loading={expense.status === "loading"}
        className="mt-5"
        column={column}
        count={expense.result.count}
        data={dataexpense}
        pagination={expense.result.pagination}
        setParam={setParam}
        param={param}
      />

      <ModalDelete
        show={modal.show}
        destroy={handleDelete}
        onHide={() => setModal({ show: false, id: "" })}
      />
      <Toaster position="top-right" containerClassName="" />
    </div>
  );
};

export default ListDataExpense;
