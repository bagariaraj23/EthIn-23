import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";
import { Navbar } from "./widgets/layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import {HuddleProvider, HuddleClient} from "@huddle01/react"
const router12 = createBrowserRouter(routes);

const huddleClient = new HuddleClient({
  projectId: "J1RSEMrgfCIItAuC4dvmOx18CuBmwg3P",
  });

function App() {
  return (
    <>
    <HuddleProvider client={huddleClient}>
      <RouterProvider router={router12} />
    </HuddleProvider>
    </>
  );
}

export default App;
