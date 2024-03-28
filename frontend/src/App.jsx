// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
