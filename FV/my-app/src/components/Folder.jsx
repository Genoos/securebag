import React from "react";
import { Link } from "react-router-dom";

export const Folder = ({ file }) => {
  return (
    <>
      <Link to={`/getsub/${file._id}`}>
        <div class="flex flex-col bg-black   border-2 border-sky-500 rounded-md h-24 w-24">
          <div>
          <img
            class="object-fill"
            src="https://i.pinimg.com/474x/69/d5/c7/69d5c7a43185046815ad3375b81c8b1b.jpg"
            alt="Sunset in the mountains"
            
          />
          </div>
          <div class="flex justify-around pt-1">
          <p class="text-sky-400">{file.name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
