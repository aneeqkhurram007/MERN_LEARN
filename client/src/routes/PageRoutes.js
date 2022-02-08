import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];
export default routes;
