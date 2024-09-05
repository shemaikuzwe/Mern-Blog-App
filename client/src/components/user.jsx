import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useSession } from "./context/session";
import axios from"axios"
export default function UserProfile({ user }) {
  const { clearSession } = useSession();
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      if (res.request == 200) {
       await  clearSession();
        return window.location.reload()
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{user?.username}</p>
          </DropdownItem>
          <DropdownItem key="profile">Profile</DropdownItem>
          <DropdownItem key="blogs">My blogs</DropdownItem>
          <DropdownItem key="logout" color="danger">
            <button onClick={handleLogout}>Log out</button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
