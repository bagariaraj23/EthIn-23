import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";
import { Navbar } from "./widgets/layout";
import Dashboard from "./Dashboard/Dashboard";
import routee from "./routes";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import { Home } from "./pages";
import { Nav } from "./widgets/layout/Nav";

const router12 = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Nav/>
      <RouterProvider router={router12} />

      {/* <Home /> */}
     {/* <Navbar brandName="navbar" routes={routee} /> */}

    </>
  );
}




export default App;
