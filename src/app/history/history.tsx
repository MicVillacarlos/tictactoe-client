"use client";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import TableLoading from "../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import { Column, TableProps } from "../../components/Organisms/table/type";
import Text3xl from "../../components/Atoms/text/Text3xl";
import { FetchGameResponse } from "../../lib/types";
import { fetchGames } from "../../api/game";
import { useRouter } from "next/navigation";

const HistoryTable = dynamic(
  () => import("../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string }>(props: TableProps<T>) => JSX.Element;

const History = ({
  initialData,
  initialTotal,
}: {
  initialData: FetchGameResponse[];
  initialTotal: number;
}) => {
  const [historyData, setHistoryData] =
    useState<FetchGameResponse[]>(initialData);
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });

  const router = useRouter();

  const tableColumns: Column<FetchGameResponse>[] = [
    { key: "createdAt", label: "Date", type: "date" },
    {
      key: "playerX",
      label: "Player X",
      render: (row) => row.playerX.name,
    },
    {
      key: "playerO",
      label: "Player O",
      render: (row) => row.playerO.name,
    },
    {
      key: "rounds",
      label: "Rounds",
    },
    {
      key: "overAllWinner",
      label: "Overall Winner",
      render: (row) => row.overAllWinner?.name ?? "TBD",
    },
  ];

  const fetchData = async () => {
    const { count, data } = await fetchGames(
      pagination.current,
      pagination.limit
    );
    setHistoryData(data);
    setPagination((prevState) => ({
      ...prevState,
      total: count,
    }));
  };

  //--Prevents fetch in first render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchData();
  }, [pagination.current]);
  //--Prevents fetch in first render

  const handleNextPagination = useCallback(() => {
    setPagination((prevState) => {
      const { total, limit, current } = prevState;
      const lastPage = Math.ceil(total / limit);
      return current < lastPage
        ? { ...prevState, current: current + 1 }
        : prevState;
    });
  }, []);

  const handlePrevPagination = useCallback(() => {
    setPagination((prevState) => ({
      ...prevState,
      current: Math.max(1, prevState.current - 1),
    }));
  }, []);

  const onSelectTablePage = useCallback((page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      current: page,
    }));
  }, []);

  const handleClickViewDetails = useCallback(
    (data: FetchGameResponse | string) => {
      const { _id } = data as FetchGameResponse;
      router.push(`/history/${_id}`);
    },
    []
  );

  return (
    <Layout>
      <div className="flex w-full justify-between items-center mb-8">
        <Text3xl> History </Text3xl>
      </div>
      <HistoryTable
        data={historyData ?? []}
        columns={tableColumns ?? []}
        handleNextNavigation={handleNextPagination}
        handlePrevNavigation={handlePrevPagination}
        onClickView={handleClickViewDetails}
        onSelectTablePage={onSelectTablePage}
        pagination={pagination}
      />
    </Layout>
  );
};

export default History;
