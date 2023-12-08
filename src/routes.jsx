import { Home, SignUp,Profile} from "./pages";

export const routes = [
  {
    name: "Dashboard",
    path: "/",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Register as a therapist",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Find Therapist",
    path: "/sign-up",
    element: <SignUp />,
  },
  
];

export default routes;
