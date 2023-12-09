import { Home, SignUp,Profile} from "./pages";
import SpeechRecognitionComponent from "./pages/audiodetection";
import HuddleCom from "./pages/Huddle";
import Blog from "./FindTherapist/Blog";
export const routee = [
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
