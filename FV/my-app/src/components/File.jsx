import React from "react";

export const File = ({file}) => {
  return (
    <a href={file.link} target="_blank">
      <p class="block max-w-sm p-6 bg-black border shadow hover:bg-gray-100 dark:bg-blackborder-2 border-sky-500 rounded-md dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {file.name}
        </h5>
      </p>
    </a>
  );
};
