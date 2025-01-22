import { Outlet } from "react-router-dom"; // Import Outlet from React Router
import NavBar from "../components/NavBar";

export default function HomeLayout() {
  return (
    <>
      <NavBar />
      {/* The Outlet component is where nested routes will be rendered */}
      <Outlet />
    </>
  );
}
