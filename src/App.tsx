

import React from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import Home from "./Component/Home";
import Paste from "./Component/Paste";
import Navbar from "./Component/Navbar";
import ViewPaste from "./Component/Viewpaste";


const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
];


const router = createBrowserRouter(routes);


const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

