import React, { useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";



export const AddFolder = (fileId) => {
  const { currentUser } = useContext(AuthContext);
  function handlesubmit(e) {


    e.preventDefault();
    console.log("fileId iiiin addfolder", fileId)

  //   let curfld = currentFolder.currentFolder;

  //   let curpath = [...curfld.path];
  //   if (curfld.path !== []) {
  //     curpath.push({ name: curfld.name, id: curfld.id });
  //     console.log("curpath in addfolder", curpath);
  //   }

  //   const folderName = e.target[0].value;
  //   const data = {
  //     name: folderName,
  //     parentId: curfld.id,
  //     path: curpath,
  //   };

  //   const colRef = collection(db, "users", currentUser.uid, "folders");
  //   addDoc(colRef, { ...data }).then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   });
  }

  return (
    <>
      <div className="gap-[15px] py-6 px-2 border-b-[2px] pb-6 border-2 border-sky-500 rounded-md ">
        <form onSubmit={handlesubmit}>
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Create Folder
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
            />
            <button type="submit" class="relative inline-flex items-center justify-center p-0.5 mt-6  mr-2 ml-20 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Create
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
