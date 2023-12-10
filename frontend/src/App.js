import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import { Nav } from "./widgets/layout/nav";
import { HuddleProvider, HuddleClient } from '@huddle01/react';
import SupportComp from "./Components/pushSupp";

const router12 = createBrowserRouter(routes);

const huddleClient = new HuddleClient({
  projectId: process.env.REACT_APP_HUDDLE_PRIVATE_PROJECT_ID,
});

function App() {
  return (
    <>
      <HuddleProvider client={huddleClient}>
        <Nav/>
        <SupportComp/>
        <RouterProvider router={router12} />
      </HuddleProvider>
    </>
  );
}

export default App;
