import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Foodmap from "./foodmap/foodmap";
import Genre from './Genre/Genre';
import Community from './Community/Community';
import Recommended from './Genre/Recommended';
import AllPosters from './Genre/AllPosters';
import Main from './MainPage/Main';
import Login from './Login/Login'; 
import Signup from './Signup/Signup';




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
    path: "/genre/recommended",
    element: <Recommended />,
  },
  {
    path: "/genre/all",
    element: <AllPosters />,
  },
    {
    path: "/login", 
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
