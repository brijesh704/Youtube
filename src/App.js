import "./App.css";
import Head from "./components/Head";
import Body from "./views/Body/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";
import { Provider, useSelector } from "react-redux";
import MainContainer from "./views/mainContainer/MainContainer";
import WatchPage from "./views/WatchPage/WatchPage";
import Login from "./views/Login/Login";
import ProtectedRoute from "./utils/ProtectectedRoute";

function AppContent() {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  console.log(isLoggedIn, "is login");

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <MainContainer />,
            </ProtectedRoute>
          ),
        },
        {
          path: "watch",
          element: (
            <ProtectedRoute>
              <WatchPage />,
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <div>
        {isLoggedIn && <Head />}
        <RouterProvider router={appRouter} />
      </div>
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
