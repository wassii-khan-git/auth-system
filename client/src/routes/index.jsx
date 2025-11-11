import React, { useEffect, useState, Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import DefaultLayout from "../components/layouts/defaultLayout";
import Login from "../pages/login";
import SignUp from "../pages/sign-up";
import NotFoundPage from "../pages/not-found";

const CustomRoute = () => {
  // loading
  const [loading, setLoading] = useState(true);
  // location
  const { pathname } = useLocation();
  // valid routes
  const validRoutes = ["/login", "/signup", "/dashboard"];
  // is valid route
  const isValidRoute = validRoutes.some((item) => item === pathname);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Default routes
  const DefaultRoutes = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    { path: "*", element: isValidRoute ? <Login /> : <NotFoundPage /> },
  ]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return <Suspense fallback={<h1>Loading...</h1>}>{DefaultRoutes}</Suspense>;
};
export default CustomRoute;
