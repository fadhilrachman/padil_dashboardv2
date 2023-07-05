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
import { getDataArticle, deleteDataArticle } from "../../redux/article";
import { convertDate, convertLink, formatNumber } from "../../utils";
import { Category } from "../../utils/interfaces/category";
import { QueryFilter } from "../../utils/interfaces";
import BaseSelect from "../../components/form/BaseSelect";

interface Modal {
  show: boolean;
  id: string;
}
const ListDataArticle = () => {
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
  const article = useAppSelector((state) => state.article);
  const dataArticle = article.result.data;
  const pagination = article.result.pagination;

  console.log(pagination);

  const column: Column[] = [
    {
      title: "Created Date",
      index: "tanggal",
      render: (val: string) => <>{convertDate(val)}</>,
    },
    {
      title: "Title ",
      index: "judul",
    },

    {
      title: "Category ",
      index: "kategori",
      render: (val: Category) => {
        return <span>{val?.nama}</span>;
      },
    },
    {
      title: "Link",
      index: "link",
      render: (val: string) => {
        return (
          <a href={val} className="text-sky-400 underline">
            {convertLink(val)}
          </a>
        );
      },
    },

    {
      title: "Action",
      index: "action",
      render: (v: any, val: any) => {
        return (
          <div>
            <Link to={`/article-update/${val._id}`}>
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
    dispatch(getDataArticle(param));
  }, [param]);

  const handleDelete = async () => {
    await dispatch(deleteDataArticle(modal.id));
    setModal({ show: false, id: "" });
    dispatch(getDataArticle(param));
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
      Math.ceil(Number(article.result.count) / e.target.value) <
      Number(pagination?.total_page)
    ) {
      return setParam({
        ...param,
        page: Math.ceil(Number(article.result.count) / e.target.value),
        limit: e.target.value,
      });
    }
    setParam({ ...param, limit: e.target.value });
  };

  return (
    <div>
      <Title title="Data Article" />
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
        <Link to="/article-create">
          <BaseButton>Create Data</BaseButton>
        </Link>
      </div>

      <BaseTable
        loading={article.status === "loading"}
        className="mt-5"
        column={column}
        count={article.result.count}
        data={dataArticle}
        pagination={article.result.pagination}
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

export default ListDataArticle;
