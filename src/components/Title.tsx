import React from "react";

const Title = ({ title, className }: { title: string; className?: string }) => {
  React.useEffect(() => {
    document.title = title;
  }, []);
  return <h1 className={`${className} text-3xl font-semibold`}>{title}</h1>;
};

export default Title;
