import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import { Nav } from "./widgets/layout/nav";

const router12 = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Nav/>
      <RouterProvider router={router12} />
    </>
  );
}

export default App;
