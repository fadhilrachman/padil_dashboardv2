import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import BaseTable from "../../components/BaseTable";
import Column from "../../utils/interfaces/column";
import { Link } from "react-router-dom";
import { deleteDataCategory, getDataCategory } from "../../redux/category";
import { useAppDispatch, useAppSelector } from "../../hook";
import ModalDelete from "../../components/ModalDelete";
import toast, { Toaster } from "react-hot-toast";

interface Modal {
  show: boolean;
  id: string;
}
const ListDataCategory = () => {
  const [modal, setModal] = useState<Modal>({
    show: false,
    id: "",
  });
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const dataCategory = category.data;
  console.log(modal);

  const column: Column[] = [
    {
      title: "Category Name",
      index: "nama",
    },
    {
      title: "Type",
      index: "type",
      render: (val: any) => {
        return (
          <span
            className={`${
              val === "income"
                ? "bg-[#ADB3CC] text-[#1D2032]"
                : "text-[#ADB3CC] bg-[#1D2032]"
            } text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
          >
            {val}
          </span>
        );
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
    dispatch(getDataCategory());
  }, []);

  const handleDelete = async () => {
    await dispatch(deleteDataCategory(modal.id));
    setModal({ show: false, id: "" });
    dispatch(getDataCategory());
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
      <Title title="Data Category" />
      <div className="mt-5 flex justify-between">
        <BaseInput placeholder="Search..." />
        <Link to="/category-create">
          <BaseButton>Create Data</BaseButton>
        </Link>
      </div>

      <BaseTable
        loading={category.status === "loading"}
        className="mt-5"
        column={column}
        data={dataCategory}
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

export default ListDataCategory;
