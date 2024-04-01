import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store.js";
import AuthLayout from "./components/AuthLayout.jsx";
import AddProduct from "./pages/AddProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/add-product",
        element: (
          <AuthLayout authentication={true}>
            <AddProduct />
          </AuthLayout>
        ),
      },
      {
        path: "*",
        element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        ),
      }
    ],
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route path='' element={<Home />} />
//       <Route path='login'  element={<Login />} />
//       <Route path='register' element={<Register />} />
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
