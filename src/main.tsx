import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import ErrorPage from "./pages/ErrorPage";
import Broken from "./pages/Broken";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const DocumentsPage = lazy(() => import("./pages/Documents"));
const AlertsPage = lazy(() => import("./pages/Alerts"));
const Rates = lazy(() => import("./pages/Rates"));
const Governance = lazy(() => import("./pages/Governance"));
const Policies = lazy(() => import("./pages/Policies"));
const Conservation = lazy(() => import("./pages/Conservation"));
const Links = lazy(() => import("./pages/Links"));
const Gallery = lazy(() => import("./pages/Gallery"));
const WaterQuality = lazy(() => import("./pages/WaterQuality"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
          { path: "services", element: <Services /> },
          { path: "documents", element: <DocumentsPage /> },
          { path: "alerts", element: <AlertsPage /> },
          { path: "contact", element: <Contact /> },
          { path: "water-quality", element: <WaterQuality /> },
          { path: "rates", element: <Rates /> },
          { path: "governance", element: <Governance /> },
          { path: "policies", element: <Policies /> },
          { path: "conservation", element: <Conservation /> },
          { path: "links", element: <Links /> },
          { path: "gallery", element: <Gallery /> },
          { path: "broken", element: <Broken /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
);
