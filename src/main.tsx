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
import Newsletters from "./pages/Newsletters";
import Conservation from "./pages/Conservation";
import Links from "./pages/Links";
import Gallery from "./pages/Gallery";
import WaterQuality from "./pages/WaterQuality";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      { path: "newsletters", element: <Newsletters /> },
      { path: "conservation", element: <Conservation /> },
      { path: "links", element: <Links /> },
      { path: "gallery", element: <Gallery /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
