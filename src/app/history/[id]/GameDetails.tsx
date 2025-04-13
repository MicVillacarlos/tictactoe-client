"use client";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../../components/Organisms/layout/Layout";
import TableLoading from "../../../components/Organisms/loaders/TableLoading";
import dynamic from "next/dynamic";
import { Column, TableProps } from "../../../components/Organisms/table/type";
import Text3xl from "../../../components/Atoms/text/Text3xl";
import { FetchRoundResponse } from "../../../lib/types";
import { fetchRounds } from "../../../api/round";
import ModalView from "../../../components/Organisms/modal/ModalView";
import Board from "../../../components/Organisms/board/Board";

const GameDetailTable = dynamic(
  () => import("../../../components/Organisms/table/Table"),
  {
    loading: () => <TableLoading />,
    ssr: false,
  }
) as <T extends { _id: string }>(props: TableProps<T>) => JSX.Element;

const GameDetails = ({
  initialData,
  initialTotal,
  gameId,
}: {
  initialData: FetchRoundResponse[];
  initialTotal: number;
  gameId: string;
  }) => {
  const [board, setBoard] = useState<string[]>([]);
  const [isViewBoard, setIsViewBoard] = useState<boolean>(false);
  const [detailsData, setDetailsData] =
    useState<FetchRoundResponse[]>(initialData);
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
    total: initialTotal,
  });

  const tableColumns: Column<FetchRoundResponse>[] = [
    {
      key: "_id",
      label: "Round",
      render: (_row, index) => (index ?? 0) + 1,
    },
    {
      key: "winnerName",
      label: "Winner",
      render: (row) => row.winnerName ?? "None",
    },
    {
      key: "loserName",
      label: "Loser",
      render: (row) => row.loserName ?? "None",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const fetchData = async () => {
    const { count, data } = await fetchRounds(
      gameId,
      pagination.current,
      pagination.limit
    );
    setDetailsData(data);
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
    (data: FetchRoundResponse | string) => {
      const { board } = data as FetchRoundResponse;
      setBoard(board);
      setIsViewBoard(true);
    },
    []
  );

  const onCloseModalHandler = useCallback(() => {
    setIsViewBoard(false);
    setBoard([])
  },[])

  return (
    <Layout>
      <div className="flex w-full justify-between items-center mb-8">
        <Text3xl> Game Details </Text3xl>
      </div>
      <GameDetailTable
        data={detailsData ?? []}
        columns={tableColumns ?? []}
        handleNextNavigation={handleNextPagination}
        handlePrevNavigation={handlePrevPagination}
        viewButtonTitle="View Board"
        onClickView={handleClickViewDetails}
        onSelectTablePage={onSelectTablePage}
        pagination={pagination}
      />
      <ModalView
        content={<Board board={board}/>}
        isOpen={isViewBoard}
        onCloseModal={onCloseModalHandler}
      />
    </Layout>
  );
};

export default GameDetails;
