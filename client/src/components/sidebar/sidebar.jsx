import React from "react";
import SearchInput from "./searchInput";
import Conversations from "./conversations";
import LogoutButton from "./LogoutButton";

const SideBar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col overflow-auto">
      <SearchInput />

      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default SideBar;
