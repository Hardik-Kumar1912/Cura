import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="flex items-center"> 
      {!loading ? (
        <BiLogOut 
          className="w-6 h-6 text-[#E8D6C1] hover:text-[#CBB69E] cursor-pointer" 
          onClick={logout} 
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
