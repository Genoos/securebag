import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const AddFile = ( fileId ) => {
  const { currentUser } = useContext(AuthContext);
  console.log("fileId", fileId);
  function handleUpload(e) {

  }

  return (
    <>
      <div className="gap-[15px] py-6 px-2 mb-4 mt-4 pb-6 border-2 border-sky-500 rounded-md ">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload file
        </label>
        <input
          class=" block w-full text-sm text-gray-900  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={handleUpload}
        />
        <button type="submit" class="relative inline-flex items-center justify-center p-0.5 mt-6  mr-2 ml-20 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Upload
              </span>
            </button>
      </div>
    </>
  );
};
