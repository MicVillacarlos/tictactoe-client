import React from "react";
import Loadingbar from "../../Atoms/loading/Loadingbar";

const TableLoading = () => {
  return (
    <div className="w-full bg-transparent flex flex-col gap-3 p-5 animate-pulse rounded rounded-lg">
      <div className="mb-3">
        <Loadingbar color="bg-gray-400" />
      </div>
      <Loadingbar color="bg-gray-300" />
      <Loadingbar color="bg-gray-200" />
      <Loadingbar color="bg-gray-200" />
    </div>
  );
};

export default TableLoading;
