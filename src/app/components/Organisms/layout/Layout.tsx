"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "../../../utils/hooks/hooks";
import { HamburgerIcon } from "../../svg/HamburgerIcon";
import { ListIcon } from "../../svg/ListIcon";
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { GameIcon } from "../../svg/GameIcon";

export default function Layout({
  children,
  isNoPadding
}: Readonly<{
  children: React.ReactNode; isNoPadding?: boolean
}>) {
  const windowWidth: number = useWindowSize();
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (windowWidth > 639) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [windowWidth]);

  const toggleOpenSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };

  const iconColor = useCallback((path: string) => {
    return pathname.startsWith(path) ?  "#205072" : "#7996AA";
  }, [pathname]);

  const SideBarOptions = [
    {
      key: 1,
      label: "Game",
      href: "/game",
      icon: <GameIcon color={iconColor("/game")} />,
    },
    {
      key: 2,
      label: "History",
      href: "/history",
      icon: <ListIcon color={iconColor("/history")} />,
    },
  ];

  return (
    <div className="bg-[#E3EEF6] h-lvh">
      {/* ----------SIDE BAR CLOSE (to refactor)-------- */}
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleOpenSidebar}
      >
        <HamburgerIcon />
      </button>
      {/* ----------SIDE BAR OPEN-------- */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-lvh transition-transform bg-white ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-8 py-2 overflow-y-auto">
          <a className="py-[48] flex items-center">
            <Image
              src="/tictactoe_large.svg"
              alt="TicTacToe_logo"
              width={0}
              height={0}
              style={{ width: "500px", height: "auto" }}
            />
          </a>
          <ul className="space-y-3 font-semibold">
            {SideBarOptions.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href);

              return (
                <React.Fragment key={item.key}>
                  <li>
                    <a
                      href={item.href}
                      className={`flex items-center p-2 rounded-lg group transition-all ${
                        isActive
                          ? "bg-gray-100 text-[#205072] shadow-xs"
                          : "text-[#7996AA] hover:bg-gray-100"
                      }`}
                    >
                      <span className="w-[50px] flex items-center justify-start">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                  {item.label === "Bills" && (
                    <hr className="border-[#7996AA] dark:border-gray-600" />
                  )}
                </React.Fragment>
              );
            })}
            {/* ✅ Logout Button */}
          </ul>
        </div>
      </aside>

      <div
        className={clsx("sm:ml-64 bg-[#E3EEF6]", !isNoPadding && "p-4 pt-10 ")}
      >
        <div className={clsx("mb-4", !isNoPadding && "p-4")}>{children}</div>
      </div>
    </div>
  );
}
