import { useState, createContext } from "react";
import loadingImage from "./loading.svg";
const Context = createContext(null);
const Provider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  function handleLoading(value: boolean) {
    setisLoading(value);
  }
  return (
    <Context.Provider value={{ isLoading, handleLoading, loadingImage }}>
      {children}
    </Context.Provider>
  );
};
const AppContext = { Context, Provider };
export default AppContext;
