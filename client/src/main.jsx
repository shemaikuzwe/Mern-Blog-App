import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import  {BrowserRouter} from "react-router-dom"
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import ThemeContextProvider, {useTheme} from "./components/themeContext.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <NextUIProvider>
          <BrowserRouter>
              <ThemeContextProvider>

                      <App/>
              </ThemeContextProvider>

          </BrowserRouter>
      </NextUIProvider>


  </StrictMode>,
)
