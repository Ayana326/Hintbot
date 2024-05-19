import { getCurrentUser } from "@/firebase/auth";
import { User } from "firebase/auth";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  currentUser: User | null | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | null | undefined>>;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  setCurrentUser: () => {},
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

export const useAuthContext = () => useContext(AuthContext);
