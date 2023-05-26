import './App.css'
import Header from "./Header.component";
import List from "./List.component";
import {createContext, useState} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Details from "./Details";

export const IsDarkContext = createContext(false);

function App() {
  const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');
  const isDefaultDarkMode = mediaQueryObj.matches;
  const [isDark, setIsDark] = useState<boolean>(isDefaultDarkMode);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <List/>
      ,
    },
    {
      path: "country/:countryName",
      element: <Details />
    }
  ]);
  const handleToggleMode = () => {
    const rootElement = document.documentElement;
    rootElement.setAttribute('data-theme', isDark ? "light" : "dark");
    setIsDark(!isDark)
  }
  return (
    <>
      <IsDarkContext.Provider value={{isDark, setIsDark}}>
        <Header toggleMode={handleToggleMode}></Header>
        <RouterProvider router={router} />
      </IsDarkContext.Provider>
    </>
  )
}

export default App
