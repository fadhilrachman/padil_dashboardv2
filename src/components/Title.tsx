import React from "react";

const Title = ({ title }: { title: string }) => {
  React.useEffect(() => {
    document.title = title;
  }, []);
  return <h1 className="text-3xl font-semibold">{title}</h1>;
};

export default Title;
