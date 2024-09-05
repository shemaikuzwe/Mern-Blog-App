import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Theme from "./theme.jsx";
import LoginModal from "./auth/login-modal.jsx";
import { useSession } from "./context/session.jsx";
import UserProfile from "./user.jsx";
export default function Nav() {
  const { session } = useSession();
  return (
    <Navbar className={"flex justify-center items-center p-4"}>
      <NavbarBrand>
        <Link to={"/"} className={"font-bold text-2xl text-inherit"}>
          Blog App
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex gap-20" justify={"end"}>
        <NavbarItem>
          <Link to={"/add"}>
            {" "}
            <span className={"font-bold text-xl text-inherit"}>Add</span>
          </Link>
        </NavbarItem>
        <NavbarItem>{session?.user?.username ? <UserProfile user={session?.user}/> : <LoginModal />}</NavbarItem>
        <NavbarItem>
          <Theme />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
