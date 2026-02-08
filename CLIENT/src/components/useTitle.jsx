import React, { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | DeerBooks`;
  }, [title]);
};

export default useTitle;
