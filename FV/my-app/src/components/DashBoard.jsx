import React,{useEffect, useState,useContext} from "react";
import { useParams } from "react-router-dom";
import { File } from "./File";
import { Folder } from "./Folder";
import AuthContext from "../contexts/AuthContext";


export const DashBoard = () => {
  let { fileId } = useParams();
  if (fileId === undefined) {
    fileId = null;
  }

  const { currentUser } = useContext(AuthContext);
  const [children, setChildren] = useState([]);

  useEffect(() => { 
    if (fileId == null) {
      try {
        const response = fetch("http://127.0.0.1:3001/user/getfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: currentUser._id, file_id: fileId }),
        })
          .then((response) => response.json())
          .then((files) =>
            setChildren(files)
          );
      } catch (err) {
        console.log("getfiles err ", err);
      }
    }
    if(fileId != null){
      try{
        const response = fetch("http://127.0.0.1:3001/user/getsub",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ parent: fileId }),
        }).then((response) => response.json()).then((files) =>{
          // console.log("files", files);/
          setChildren(files)
        })
      }catch(e){
        console.log("getsub err ", e);
      }
    }
  },[fileId])

  return (
    <>
      <div className="pt-16 bg-slate-800 h-screen">
        <h1 className="text-2xl text-center">Dashboard</h1>
        <div className="flex flex-wrap justify-center">
        {children &&
          children.map((child) => {
            if (child.directory) {
              return (
                <div className="p-4">
                  <Folder file={child} />
                </div>
              );
            } else {
              return (
                <div className="p-4">
                  <File file={child} />
                </div>
              );
            }
          })}
            
        </div>
      </div>
    </>
  );
};
