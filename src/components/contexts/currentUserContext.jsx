import { useContext, createContext, useState } from "react";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const localUser = localStorage.getItem("currentUser");
    return localUser ? JSON.parse(localUser) : null;
  });

  const setAndPersistUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser: setAndPersistUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
