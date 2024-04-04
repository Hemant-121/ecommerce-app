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
import AuthLayout from "./components/AuthLayout.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux-toolkit/store.js'
import ProductList from "./pages/ProductList.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";

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
        path: "/my-product",
        element: (
          <AuthLayout authentication={true}>
            <ProductList />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-product/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditProductPage/>
          </AuthLayout>
        ),
      },
      {
        path: "*",
        element: (
          <AuthLayout authentication={true}>
            <Home/>
          </AuthLayout>
        ),
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster />
      <RouterProvider router={router} />
      <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
