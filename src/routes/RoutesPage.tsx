import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";
import listRouter from "./listRoute";
const RoutesPage = () => {
  return (
    <Layout>
      <Routes>
        {listRouter.map((val, key) => {
          return <Route path={val.path} element={<val.element />} key={key} />;
        })}
        <Route />
      </Routes>
    </Layout>
  );
};

export default RoutesPage;
