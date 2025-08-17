import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Foodmap from "./foodmap/foodmap";
import Genre from './Genre/Genre';
import Community from './Community/Community';
import Recommended from './Genre/Recommended';
import AllPosters from './Genre/AllPosters';
import Main from './MainPage/Main';
import Login from './Login/Login'; 
import Signup from './Signup/Signup';
import ContentDetail from "./ContentDetail/ContentDetail";
import MyTest from './components/MyTest';
import TestResults from './components/TestResults';
import TestDatabase from './components/TestDatabase';
import AITranslation from './components/AITranslation';



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
  },
  {
    path: "/content/:id", element: <ContentDetail />
  },
  {
    path: "/test/my-test",
    element: <MyTest />
  },
                  {
          path: "/test/results",
          element: <TestResults />
        },
        {
          path: "/test/database",
          element: <TestDatabase />
        },
        {
          path: "/ai-translation",
          element: <AITranslation />
        }
  

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
