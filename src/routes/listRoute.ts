import Dashboard from "../pages/Dashboard";
interface ListRouter {
  path: string;
  element: any;
}

const listRouter: ListRouter[] = [
  {
    path: "/",
    element: Dashboard,
  },
];

export default listRouter;
