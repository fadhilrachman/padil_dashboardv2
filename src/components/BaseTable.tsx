import React from "react";
import Column from "../utils/interfaces/column";

interface Props {
  column: Column[];
  data?: any;
  loading?: boolean;
  className?: string;
}
const BaseTable = ({ column, data, loading, className }: Props) => {
  return (
    <table className={`${className} w-full text-sm text-left  shadow `}>
      <thead className="text-xs  uppercase  bg-[#1D2032] rounded-t-full  ">
        <tr>
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
        {data?.length === 0 ? (
          <tr className="   font-medium">
            <td className="px-6 py-4 text-center" colSpan={column.length}>
              Tidak ada Data
            </td>
          </tr>
        ) : (
          data?.map((val: any) => (
            <tr className="   font-medium">
              {column.map((valColumn) =>
                valColumn.render ? (
                  <td className="px-6 py-4 text-center">
                    {valColumn.render(val, val[valColumn?.index])}
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
  );
};

export default BaseTable;
