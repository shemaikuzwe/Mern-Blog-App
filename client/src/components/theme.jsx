import {FaSun,FaMoon} from "react-icons/fa6"
import {useTheme} from "./themeContext.jsx";
export default function Theme(){
    const {theme,toggleTheme}=useTheme()
   const handleChangeTheme=()=>{
     toggleTheme()
   }

    return(
      <div className={`flex justify-end items-end px-3 py-1 w-12 ${theme?"bg-white":"bg-black" } border rounded`}>
        <button onClick={handleChangeTheme}>
            {theme?<FaMoon size={20} className={"text-black"}/>:<FaSun size={20} className={"text-white"}/>}
            </button>
      </div>
    );
}