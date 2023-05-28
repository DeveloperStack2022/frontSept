import routes from "@/routes";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProctedRoute from "@/Routes/procted.routes";
// Components
import Sidebar from "@/components/sidebar";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();

  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    });
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  // TODO: Active Routes
  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + "/" + routes[i].path) !=
        -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  // TODO: Active Navbar
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary ? true : false;
      }
    }
    return activeNavbar;
  };

  // TODO: Get Routes
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout == "/admin") {
        return (
          <Route
            path={`/${prop.path}`}
            element={<ProctedRoute>{prop.component}</ProctedRoute>}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="flex bg-gray-100 font-sans text-gray-900">
      <Sidebar
        onClose={() => {
          setOpen(false);
        }}
        open={false}
      />
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-18 items-center justify-between gap-x-6 border-b border-gray-200 bg-white px-12">
          {/* Separator */}

          <span className="text-3xl font-semibold ">{currentRoute}</span>
          {/* User Avatar */}
          {/* <div className="h-4/6 w-px bg-gray-200" /> */}
          <div className="flex">
            <div className="relative inline-block ">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-700  text-center  font-bold leading-none text-white">
                LU
              </span>
              <span className="absolute bottom-0 right-0 inline-block h-3 w-3 rounded-full border-2 border-white bg-green-600"></span>
            </div>
            <div className="ml-2">
              <span className="block font-semibold ">Luis Zapata</span>
              <span className="block leading-3 text-gray-400">
                User septier
              </span>
            </div>
          </div>
        </header>
        {/* Navbar & Main Contain */}

        <main className="pt-5s min-h-[84vh] flex-1 overflow-y-scroll p-2 px-12 md:pr-2">
          <Routes>
            {getRoutes(routes)}
            <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
