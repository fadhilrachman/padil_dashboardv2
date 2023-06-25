import Column from "../utils/interfaces/column";
import React, { useEffect, useState } from "react";
import { Pagination } from "../utils/interfaces";
interface Props {
  column: Column[];
  data?: any;
  loading?: boolean;
  className?: string;
  count?: number;
  totalPage?: number;
  pagination?: Pagination;
  setParam?: any;
  param?: any;
}
const BaseTable = ({
  column,
  data,
  loading,
  className,
  count,
  pagination,
  setParam,
  param,
}: Props) => {
  const [page, setPage] = useState<number[]>([]);
  const totalPage = pagination?.total_page;
  const limit = param.limit;
  const currentPage = pagination?.current_page || 1;
  useEffect(() => {
    let array: number[] = [];

    if (totalPage) {
      for (let i: number = 1; i <= totalPage; i++) {
        array.push(i);
      }
      setPage(array);
    }
  }, [totalPage]);

  const showingTo: number | undefined =
    Number(limit) * Number(currentPage) < Number(count)
      ? Number(limit) * Number(currentPage)
      : count;

  const showingMin: number =
    Number(currentPage) * Number(limit) + 1 - Number(limit);

  return (
    <div>
      <table
        className={`${className} w-full relative overflow-x-auto text-sm text-left  shadow `}
      >
        <thead className="text-xs  uppercase  bg-[#1D2032] rounded-t-full  ">
          <tr>
            <th className="px-6 py-3 font-extrabold text-center">#</th>
            {column.map((val) => {
              return (
                <th className="px-6 py-3 font-extrabold text-center">
                  {val.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="h-20 ">
              <td className="text-center" colSpan={column.length + 1}>
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr className="   font-medium">
              <td className="px-6 py-4 text-center" colSpan={column.length + 1}>
                Tidak ada Data
              </td>
            </tr>
          ) : (
            data?.map((val: any, key: number) => (
              <tr className="   font-medium">
                <td className="px-6 py-4 text-center">
                  {key + 1 + Number(currentPage) * limit - limit}
                </td>
                {column.map((valColumn) =>
                  valColumn.render ? (
                    <td className="px-6 py-4 text-center">
                      {valColumn.render(val[valColumn?.index], val)}
                    </td>
                  ) : (
                    <td className="px-6 py-4 text-center">
                      {val[valColumn?.index]}
                    </td>
                  )
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!loading && (
        <div className="flex justify-between items-center px-10 mt-10">
          <small>
            Showing {showingMin} to {showingTo} of {count || 0} enteries
          </small>
          {totalPage && (
            <div className="">
              {data?.length !== 0 &&
                page.map((val) => (
                  <span
                    className={`${
                      val === currentPage && "bg-[#ADB3CC] text-[#171B2D]"
                    } border border-[#ADB3CC] rounded-lg px-3 py-1 hover:cursor-pointer hover:opacity-70 mr-3`}
                    // onClick={() => setParam({ ...param, page: val })}
                    onClick={() => setParam({ ...param, page: val })}
                  >
                    {val}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
// ${"bg-[#ADB3CC] text-[#171B2D]"}

export default BaseTable;
