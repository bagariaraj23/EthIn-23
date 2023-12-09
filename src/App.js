import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import SupportComp from "./Components/pushSupp";
import Notif from "./Components/Notif";

const router12 = createBrowserRouter(routes);

function App() {
  return (
    <>
      <SupportComp />
      <RouterProvider router={router12} />
      <Notif/>
    </>
  );
}

export default App;
