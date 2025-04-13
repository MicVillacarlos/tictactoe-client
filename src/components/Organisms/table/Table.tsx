import React from "react";
import {
  capitalizeFirstLetter,
  formatDate,
  moneyFormat,
  paginationPages,
} from "../../../lib/helpers/helpers";
import { EmptyBoxIcon } from "../../svg/EmptyBoxIcon";
import { NextIcon } from "../../svg/NextIcon";
import { PreviousIcon } from "../../svg/PreviousIcon";
import { TableProps } from "./type";

const Table = <
  T extends {
    bill_number: string;
    _id: string;
  }
>({
  data,
  columns,
  handleNextNavigation,
  handlePrevNavigation,
  onSelectTablePage,
  onClickView,
  viewButtonTitle,
  pagination,
}: TableProps<T>) => {
  const pages = paginationPages(
    pagination.current,
    pagination.limit,
    pagination.total
  );

  const getCellContent = <T extends { _id: string }>(
    item: T,
    col: {
      key: keyof T;
      type?: string;
      render?: (row: T, index: number) => React.ReactNode;
    },
    index: number // ← add this!
  ): React.ReactNode => {
    const value = item[col.key];

    if (col.render) {
      return col.render(item, index);
    }

    if (col.type === "money" && typeof value === "number") {
      return moneyFormat(value);
    }

    if (col.type === "date") {
      return formatDate(value as string | Date);
    }

    if (col.key === "email") {
      return value as React.ReactNode;
    }

    if (typeof value === "string") {
      return capitalizeFirstLetter(value);
    }

    return value as React.ReactNode;
  };

  return (
    <div className="relative overflow-x-auto w-full">
      {data.length ? (
        <>
          <div className="overflow-x-auto w-full rounded-t-md">
            <div className="min-w-[700px]">
              {
                <table className="w-full text-base text-left rtl:text-right text-gray-500 shadow-sm">
                  <thead className="text-sm uppercase bg-[#205072] text-white">
                    <tr>
                      {columns.map((col, index) => (
                        <th
                          key={index}
                          scope="col"
                          className={`px-6 py-3 ${
                            col.justify === "right" ? "text-right" : "text-left"
                          }`}
                        >
                          {col.label}
                        </th>
                      ))}
                      {onClickView && (
                        <th className="px-6 py-3 text-center">Actions</th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b border-gray-200"
                      >
                        {columns.map((col, colIndex) => (
                          <td
                            key={colIndex}
                            className={`px-6 py-4 ${
                              col.justify === "right"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {getCellContent(item, col, index)}
                          </td>
                        ))}

                        {onClickView && (
                          <td className="flex justify-center px-6 py-4 space-x-2">
                            <button
                              onClick={() => onClickView(item)}
                              className="hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                            >
                              {viewButtonTitle ?? "View Details"}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </div>
          </div>

          <nav aria-label="Page navigation" className="w-full">
            <ul className="flex items-center justify-end p-2 text-base w-full rounded-b-md bg-[#205072]">
              <li>
                <button
                  onClick={handlePrevNavigation}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <PreviousIcon />
                </button>
              </li>
              {pages.map((item, index) => {
                const isActive = item === pagination.current;
                return (
                  <li key={index}>
                    <button
                      onClick={() => onSelectTablePage(item)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border cursor-pointer
                   ${
                     isActive
                       ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-gray-700"
                       : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                   }`}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}

              <li>
                <button
                  onClick={handleNextNavigation}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <NextIcon />
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="w-full bg-white rounded-lg h-[300px] flex flex-col justify-center items-center">
          <EmptyBoxIcon size={70} color="#9ca3af" />
          <p className="mt-5 font-medium leading-none tracking-tight text-gray-400 text-xl align-center">
            No Data Found
          </p>
        </div>
      )}
    </div>
  );
};

export default Table;
