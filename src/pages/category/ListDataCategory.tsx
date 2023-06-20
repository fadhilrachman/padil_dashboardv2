import React, { useEffect } from "react";
import Title from "../../components/Title";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import BaseTable from "../../components/BaseTable";
import Column from "../../utils/interfaces/column";
import { Link } from "react-router-dom";
import { getDataCategory } from "../../redux/category";
import { useAppDispatch, useAppSelector } from "../../hook";
const ListDataCategory = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const dataCategory = category.data;
  console.log(category);

  const column: Column[] = [
    {
      title: "Category Name",
      index: "nama",
    },
    {
      title: "Type",
      index: "type",
    },
    {
      title: "Action",
      index: "action",
      render: () => {
        return (
          <div>
            <span className="text-sky-400 underline mr-2 hover:cursor-pointer">
              Update
            </span>
            <span className="text-red-500 underline hover:cursor-pointer">
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
    </div>
  );
};

export default ListDataCategory;
