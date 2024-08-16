import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {Link} from "react-router-dom";
import Theme from "./theme.jsx";
export default function Nav(){
    return(

            <Navbar className={"flex justify-center items-center p-4"}>
                <NavbarBrand >
                    <Link to={"/"} className={"font-bold text-2xl text-inherit"}>Blog App</Link>
                </NavbarBrand>
                <NavbarContent className="flex gap-60" justify={"end"} >
                     <NavbarItem>
                         <Link to={"/add"}> <span className={"font-bold text-xl text-inherit"}>Add</span></Link>
                     </NavbarItem>
                    <NavbarItem>
                        <Theme/>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

    );
}