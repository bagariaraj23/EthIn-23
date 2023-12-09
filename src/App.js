import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import SupportComp from "./Components/pushSupp";
// import Notif from "./Components/Notif";
import { Navbar } from "../src/widgets/layout/navbar";
import { HuddleProvider } from '@huddle01/react';
import { HuddleClient } from '@huddle01/react';

const router12 = createBrowserRouter(routes);

const huddleClient = new HuddleClient({
  projectId: "J1RSEMrgfCIItAuC4dvmOx18CuBmwg3P",
  })

function App() {
  return (
    <>
    <HuddleProvider client={huddleClient}>
    <Navbar brandName="abc" router12 action />
      <SupportComp />
      <RouterProvider router={router12} />
      {/* <Notif/> */}
      </HuddleProvider>
    </>
  );
}

export default App;
