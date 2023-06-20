import Dashboard from "../pages/Dashboard";
import CreateCategory from "../pages/category/Create";
import ListDataCategory from "../pages/category/ListDataCategory";
import UpdateCategory from "../pages/category/Update";
import CreateDataIncome from "../pages/income/Create";
import ListDataIncome from "../pages/income/ListDataIncome";
interface ListRouter {
  path: string;
  element: any;
}

const listRouter: ListRouter[] = [
  {
    path: "/",
    element: Dashboard,
  },
  //   INCOME
  {
    path: "/income",
    element: ListDataIncome,
  },
  {
    path: "/income-create",
    element: CreateDataIncome,
  },
  //   CATEGORY
  {
    path: "/category",
    element: ListDataCategory,
  },
  {
    path: "/category-create",
    element: CreateCategory,
  },
  {
    path: "/category-update/:id",
    element: UpdateCategory,
  },
];

export default listRouter;
