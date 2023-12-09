import { Home, SignUp,Profile} from "./pages";
import SpeechRecognitionComponent from "./pages/audiodetection";
import HuddleCom from "./pages/Huddle";
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

export default routes;
