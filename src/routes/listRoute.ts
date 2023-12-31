import Dashboard from "../pages/Dashboard";
import CreateDataArticle from "../pages/article/Create";
import ListDataArticle from "../pages/article/ListDataArticle";
import UpdateArticle from "../pages/article/Update";
import CreateCategory from "../pages/category/Create";
import ListDataCategory from "../pages/category/ListDataCategory";
import UpdateCategory from "../pages/category/Update";
import CreateExpense from "../pages/expense/Create";
import ListDataExpense from "../pages/expense/ListDataExpense";
import UpdateExpense from "../pages/expense/Update";
import CreateDataIncome from "../pages/income/Create";
import ListDataIncome from "../pages/income/ListDataIncome";
import UpdateDataIncome from "../pages/income/Update";
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
  {
    path: "/income-update/:id",
    element: UpdateDataIncome,
  },
  // EXPENSE
  {
    path: "/expense",
    element: ListDataExpense,
  },
  {
    path: "/expense-create",
    element: CreateExpense,
  },
  {
    path: "/expense-update/:id",
    element: UpdateExpense,
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

  // ARTICLE
  {
    path: "/article",
    element: ListDataArticle,
  },
  {
    path: "/article-create",
    element: CreateDataArticle,
  },
  {
    path: "/article-update/:id",
    element: UpdateArticle,
  },
];

export default listRouter;
