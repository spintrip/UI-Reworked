import React from "react";
import {
  authenticationRoute,
  blogroutes,
  listingroutes,
  pageroutes,
  publicRoutes,
  usermodule,
  hostmodule,
} from "./router.link";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import Progress from "../common/progressbar";
import Error404 from "../pages/errorpages/error404";

const AllRoutes = () => {
  const HeaderLayout = () => (
    <>
      <Header />
      <Outlet />
      <Progress />
      <Footer />
    </>
  );

  const PageLayout = () => (
    <>
      <Header />
      <Outlet />
      <Progress />
      <Footer />
    </>
  );
  const UserLayout = () => (
    <>
      <Header />
      <Outlet />
      <Progress />
      <Footer />
    </>
  );
  const HostLayout = () => (
    <>
      <Header />
      <Outlet />
      <Progress />
      <Footer />
    </>
  );

  return (
    <>
      <Routes>
        <Route path={"/"} element={<HeaderLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/pages"} element={<PageLayout />}>
          {pageroutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/blog"} element={<PageLayout />}>
          {blogroutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/listings"} element={<PageLayout />}>
          {listingroutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/user"} element={<UserLayout />}>
          {usermodule.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/host"} element={<HostLayout />}>
          {hostmodule.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/"}>
          {authenticationRoute.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/"}>
          <Route path="/index" element={<Navigate to="/index" />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};
export default AllRoutes;
