import AuthContext from "../contexts/AuthContext";
import { useReducer, useEffect, useContext } from "react";

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
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
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
        }
  }
}

function formatDoc(doc) {
  return { id: doc.id, ...doc.data() };
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  const { currentUser } = useContext(AuthContext);
  const ROOT_FOLDER = {
    name: currentUser.uid,
    id: currentUser.uid,
    path: [],
  };

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { folderId, folder },
    });
  }, [folderId, folder]);

  useEffect(() => {

    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    try {
      const docRef = doc(db, "users", currentUser.uid, "folders", folderId);

      const docsnap = getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: formatDoc(doc) },
            });
          }
        //   console.log("Document data:", formatDoc(doc));
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } catch (err) {
      console.log(err);
    }

  }, [folderId]);

  useEffect(() => {
    console.log("useeffect childfolders");
    
      let collectionRef = collection(db, "users", currentUser.uid, "folders");
      
    if(folderId == null) {
      collectionRef = query(
        collectionRef,
        where("parentId", "==", currentUser.uid)
      );}
      else{
        collectionRef = query(
          collectionRef,
          where("parentId", "==", folderId)
        );
      }

      const unsubscribe = getDocs(collectionRef).then((querySnapshot) => {
        const childs = querySnapshot.docs.map((doc) => formatDoc(doc));
        console.log("childFolders", childs);
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: childs },
        });
      });
    
  }, [folderId]);

  useEffect(() => {
    console.log("useeffect childfiles");
    if (folderId == null) {
      return;
    }
    let collectionRef = collection(db, "users", currentUser.uid, "files");
    collectionRef = query(collectionRef, where("folderId", "==", folderId));
    const unsubscribe = getDocs(collectionRef).then((querySnapshot) => {
      const childs = querySnapshot.docs.map((doc) => formatDoc(doc));
      console.log("childFiles", childs);
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: childs },
      });
    });
  },[folderId])

  return state;
}
