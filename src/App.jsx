import { useRoutes } from "react-router-dom";
import routes from "./router/Router";

function App() {
  const routing = useRoutes(routes);
  return <>{routing}</>;
}

export default App;
