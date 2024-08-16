import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import Nav from "./components/Navbar.jsx";
import {useTheme} from "./components/themeContext.jsx";
import Add from "./components/Add.jsx"
import Edit from "./components/edit.jsx";
import Footer from "./components/footer.jsx";

function App() {
    const {theme}=useTheme()
  return (
      <>
      <main className={`${theme?"dark":""} text-foreground bg-background h-[100vh]`}>
          <Nav/>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route  path={"/add"} element={<Add/>}/>
              <Route path={"/edit/:id" } element={<Edit/>}/>
          </Routes>
          <Footer/>
      </main>
  </>
  )
}

export default App
