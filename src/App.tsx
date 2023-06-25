import { Suspense } from "react";
import "./App.css";
import RoutesPage from "./routes/RoutesPage";
import { getToken } from "./utils";
import AuthPage from "./routes/AuthPage";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");
  return (
    <div className="font-index bg-[#171B2D] min-h-screen text-[#ADB3CC] flex">
      <Suspense fallback={<>.......</>}>
        {token ? <RoutesPage /> : <AuthPage />}
      </Suspense>
    </div>
  );
}

export default App;
