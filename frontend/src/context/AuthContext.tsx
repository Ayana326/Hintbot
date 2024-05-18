import { getCurrentUser } from "@/firebase/auth";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

type AuthContextProps = {
  currentUser: User | null | undefined;
  setCurrentUser: ((user: User | null) => void) | undefined;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  setCurrentUser: undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  useEffect(() => {
    getCurrentUser(async (user: User | null) => {
      if (user) {
        const token = await user?.getIdToken(true);
        document.cookie = `token=${token}; Secure;`;
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
