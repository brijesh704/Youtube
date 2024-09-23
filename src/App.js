import "./App.css";
import Head from "./components/Head";
import Body from "./views/Body/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import MainContainer from "./views/mainContainer/MainContainer";
import WatchPage from "./views/WatchPage/WatchPage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
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
  ]);
  return (
    <>
      <Provider store={store}>
        <div>
          <Head />
          <RouterProvider router={appRouter} />

          {/**
           *
           * Head
           * Body
           *  Sidebar
           *    MenuItems
           *  MainContainer
           *    ButtonsList
           *    VideoContainer
           *      VideoCard
           *
           *
           */}
        </div>
      </Provider>
    </>
  );
}

export default App;
