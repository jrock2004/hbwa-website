import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DocumentsPage from "./pages/Documents";
import AlertsPage from "./pages/Alerts";
import Rates from "./pages/Rates";
import Governance from "./pages/Governance";
import Policies from "./pages/Policies";
import Conservation from "./pages/Conservation";
import Links from "./pages/Links";
import Gallery from "./pages/Gallery";
import WaterQuality from "./pages/WaterQuality";

import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";
import ErrorPage from "./pages/ErrorPage";
import Broken from "./pages/Broken";

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
