import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Foodmap from "../src/foodmap/foodmap";



const router = createBrowserRouter([
  {
    path: "/foodmap",
    element: <Foodmap />,
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
