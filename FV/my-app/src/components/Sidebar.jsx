import React, { useEffect,useContext } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { AddFolder } from "./AddFolder";

import { useParams } from 'react-router-dom'
import AuthContext from "../contexts/AuthContext";

import { AddFile } from "./AddFile";


const Sidebar = () => {
  let { fileId } = useParams();
  if (fileId === undefined) {
    fileId = null;
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  return (
    <>
      <div className="md:bg-black bg-green-500 fixed pt-16 h-screen px-4 border-t-2">
        <div className="px-[15px] py-[20px] flex items-center justify-center ">
          <h2 className="text-white text-[20px] font-bold">Folder Menu</h2>
        </div>
        {/* input  */}
        <AddFolder fileId = {fileId}/>
        
        {/* create folder */}
        
        <AddFile fileId = {fileId}/>
        

      </div>
      
    </>
  );
};

export default Sidebar;
