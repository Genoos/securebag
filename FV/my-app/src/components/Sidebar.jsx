import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
// import { AddFolder } from "./AddFolder";
// import { useFolder } from "../hooks/useFolder";
import { useParams } from 'react-router-dom'
// import { AddFile } from "./AddFile";


const Sidebar = () => {
  let { folderId } = useParams()
  if (folderId === undefined) {
    folderId = null;
  }
  // const state = useFolder(folderId);
 
  // console.log("folderstate sidebar", state);


  return (
    <>
      <div className="md:bg-black bg-green-500 fixed pt-16 h-screen px-4 border-t-2">
        <div className="px-[15px] py-[20px] flex items-center justify-center border-b-[2px] border-[#f1eeee]">
          <h2 className="text-white text-[20px] font-bold">Folder Menu</h2>
        </div>
        {/* input  */}
        {/* <AddFile currentFolder = {state.folder}/> */}
        
        {/* create folder */}
        
        {/* <AddFolder currentFolder = {state.folder}/> */}
        

      </div>
      
    </>
  );
};

export default Sidebar;
