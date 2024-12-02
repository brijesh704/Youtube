import "./App.css";
import Head from "./components/Head";
import Body from "./views/Body/Body";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import store from "./app/store";
import { Provider, useSelector } from "react-redux";
import MainContainer from "./views/mainContainer/MainContainer";
import WatchPage from "./views/WatchPage/WatchPage";
import Login from "./views/Login/Login";
import ProtectedRoute from "./utils/ProtectectedRoute";

function AppContent() {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  console.log(isLoggedIn, "is login in apppppppjs");
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Body />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "watch",
          element: <WatchPage />,
        },
      ],
    },
    {
      path: "/login",
      element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
    },
  ]);
  return (
    <>
      <div>{isLoggedIn && <Head />}</div>
      <RouterProvider router={appRouter} />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
