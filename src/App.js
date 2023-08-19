import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from './store';

import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./containers/Home";
import Templates from "./containers/Templates";
import Editor from "./containers/Editor";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";

import Google from "./splash/Google";

import Snackbar from "./components/Snackbar";
import { setSnackMessage } from "./store/reducers/common.reducers";

const Layout = (props) => {
  const common = useSelector(state => state.common);

  return (
    <main className={common.theme}>
      <Header />
      <div className="containerBox flex flex-col bg-slate-200 dark:bg-neutral-800">
        <Snackbar data={common.snack} setMessage={setSnackMessage} />
        <Outlet />
        <Footer />
      </div>
    </main>
  )
};

const App = () => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/templates',
          element: <Templates />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/editor',
          element: <Editor />
        },
        {
          path: '/signin',
          element: <Signin />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/settings',
          element: <Settings />
        },
        {
          path: '/google_success',
          element: <Google header="Success" />
        },
        {
          path: '/google_failed',
          element: <Google header="Failed" />
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;