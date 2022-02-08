import Navbar from "./components/common/Navbar";
import { useRoutes } from "react-router-dom";
import pageRoutes from "./routes/PageRoutes";
function App() {
  const routes = useRoutes(pageRoutes);
  return (
    <>
      <Navbar />
      {routes}
    </>
  );
}

export default App;
