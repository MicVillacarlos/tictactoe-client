import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const addApostrophe = (name: string): string => {
  if (!name) return "";

  const trimmedName = name.trim();
  const lastChar = trimmedName.charAt(trimmedName.length - 1).toLowerCase();

  return lastChar === "s" ? `${trimmedName}'` : `${trimmedName}'s`;
}


export const paginationPages = (current: number, limit: number, total: number): number[] => {
  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;

  let startPage = Math.max(1, current - 2);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};


export const moneyFormat = (number: number) => {
  return `₱${number.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ""; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const lowercaseFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const formatNumberToString = (number: number, prefix?: string) => {
  return prefix + number.toString();
};

export const formatStringToNumber = (string: string) => {
  return Number(string);
}

export const formatDate = (date: Date | string) => {
  const timezone = process.env.NEXT_PUBLIC_TIMEZONE ?? "UTC";
  const zonedDate = toZonedTime(new Date(date), timezone);
  return format(zonedDate, "MM-dd-yyyy");
};