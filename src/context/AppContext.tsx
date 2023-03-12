import { createContext, useContext, useState } from "react";

interface IAppContextProps {
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const AppContext = createContext<IAppContextProps>({
  user: {},
  loading: true,
  setUser: () => {},
  setLoading: () => {},
});

export const GlobalContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
