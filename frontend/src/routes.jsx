<<<<<<< Updated upstream:frontend/src/routes.jsx
import { Home, SignUp,Profile} from "./pages";
import SpeechRecognitionComponent from "./pages/audiodetection";
import HuddleCom from "./pages/Huddle";
export const routes = [
=======

import { Home, SignUp,Profile} from "./pages";
import Blog from "./FindTherapist/Blog";
export const routee = [
>>>>>>> Stashed changes:src/routes.jsx
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  
  {
    name: "profile",
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    name: "Register as a therapist",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Find Therapist",
    path: "/Therapists",
    element: <Blog />,
  },
  {
    name: "speech",
    path: '/audio',
    element: <SpeechRecognitionComponent/>
  },
  {
    name: "meeting",
    path: "/meeting",
    element: <HuddleCom />
  }
  
];

export default routee;
