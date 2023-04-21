import React from "react";

export const File = ({file}) => {
  return (
    <a href={file.link} target="_blank">
      <div class="flex flex-col bg-black   border-2 border-sky-500 rounded-md h-24 w-24">
          <div>
          <img
            class="object-fill"
            src="https://media.istockphoto.com/id/1161114277/vector/document-icon-on-black-background-black-flat-style-vector-illustration.jpg?s=170667a&w=0&k=20&c=II_wh_3pWrRAMnjKoOEDgKq0Gr2FBgbYh79KdheRQKE="
            alt="Sunset in the mountains"
            
          />
          </div>
          <div class="flex justify-around pt-1">
          <p class="text-sky-400">{file.name.slice(0, 12)}</p>
          </div>
        </div>
    </a>
  );
};
