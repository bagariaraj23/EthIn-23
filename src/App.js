import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";
import { Navbar } from "./widgets/layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";

const router12 = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router12} />
    </>
  );
}

export default App;
