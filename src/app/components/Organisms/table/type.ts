export interface Column<T> {
  key: keyof T;
  label: string;
  type?: "money" | "date" | "status_select";
  justify?: "center" | "left" | "right";
  render?: (row: T) => React.ReactNode;
}
export interface TableProps<T extends { _id: string }> {
  data: T[];
  columns: Column<T>[];
  isNoPagination?: boolean;
  handleNextNavigation: () => void;
  handlePrevNavigation: () => void;
  onSelectTablePage: (page: number) => void;
  pagination: {
    current: number;
    limit: number;
    total: number;
  };
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelectStatus?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => void;
  onClickMessage?: (arg0: T | string) => void;
  onClickEdit?: (arg0: T | string) => void;
  onClickDelete?: (arg0: T | string) => void;
  onClickView?: (arg0: T | string) => void;
  onClickCheckbox?: (arg0: T | string) => void;
  selectedBillNumbers?: number[];
}
