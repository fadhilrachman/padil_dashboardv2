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
import { QueryFilter } from "../../utils/interfaces";
import BaseSelect from "../../components/form/BaseSelect";

interface Modal {
  show: boolean;
  id: string;
}
const ListDataIncome = () => {
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
  const income = useAppSelector((state) => state.income);
  const dataIncome = income.result.data;
  const pagination = income.result.pagination;
  console.log(pagination);

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
  // let angka: number = 7;

  useEffect(() => {
    dispatch(getDataIncome(param));
  }, [param]);

  const handleDelete = async () => {
    await dispatch(deleteDataIncome(modal.id));
    setModal({ show: false, id: "" });
    dispatch(getDataIncome(param));
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
      Math.ceil(Number(income.result.count) / e.target.value) <
      Number(pagination?.total_page)
    ) {
      return setParam({
        ...param,
        page: Math.ceil(Number(income.result.count) / e.target.value),
        limit: e.target.value,
      });
    }
    setParam({ ...param, limit: e.target.value });
  };

  return (
    <div>
      <Title title="Data Income" />
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
        <Link to="/income-create">
          <BaseButton>Create Data</BaseButton>
        </Link>
      </div>

      <BaseTable
        loading={income.status === "loading"}
        className="mt-5"
        column={column}
        count={income.result.count}
        data={dataIncome}
        pagination={income.result.pagination}
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

export default ListDataIncome;
