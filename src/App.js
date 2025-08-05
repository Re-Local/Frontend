import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Foodmap from "../src/foodmap/foodmap";
import Genre from './Genre/Genre';
import Community from './Community/Community';
import Recommended from './Genre/Recommended';
import AllPosters from './Genre/AllPosters';
import Main from './Main';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/foodmap",
    element: <Foodmap />,
  },
  {
    path: "/genre",
    element: <Genre />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/genre/recommend",
    element: <Recommended />,
  },
  {
    path: "/genre/all",
    element: <AllPosters />,
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
