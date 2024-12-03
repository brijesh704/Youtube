import "./App.css";
import Head from "./components/Head";
import Body from "./views/Body/Body";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import store from "./app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import MainContainer from "./views/mainContainer/MainContainer";
import WatchPage from "./views/WatchPage/WatchPage";
import Login from "./views/Login/Login";
import ProtectedRoute from "./utils/ProtectectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { removeUser, setUser } from "./features/userSlice";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  console.log(isLoggedIn, "is login in apppppppjs");

  // use for auth sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          setUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
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
