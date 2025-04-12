export interface Column<T> {
  key: keyof T;
  label: string;
  type?: "money" | "date" | "status_select";
  justify?: "center" | "left" | "right";
  render?: (row: T, index?:number) => React.ReactNode;
}
export interface TableProps<T extends { _id: string }> {
  data: T[];
  columns: Column<T>[];
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
  onClickView?: (arg0: T | string) => void;
  viewButtonTitle?: string;
}
