import AuthContext from "../contexts/AuthContext";
import { useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        fileId: payload.fileId,
        children: payload.files,
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
  }
}

function formatDoc(doc) {
  return { id: doc.id, ...doc.data() };
}

export async function useFolder(fileId = null) {
  const [state, dispatch] = useReducer(reducer, {
    fileId:null,
    children: [],
  });
  console.log("fileId", fileId)

  
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (fileId == null) {
      console.log(currentUser);
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
            dispatch({
              type: ACTIONS.SELECT_FOLDER,
              payload: { files },
            })
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
          console.log("files", files);
          dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: { files },
          })
        })
      }catch(e){
        console.log("getsub err ", e);
      }
    }

    console.log("files");
  });

  return state;
}
