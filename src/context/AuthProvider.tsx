import { createContext, ReactElement, useContext, useState } from "react";

type TAuthProviderProps = {
    children: ReactElement;
};

type TAuthContext = {
    updateUser: (id: string) => void;
    user: string;
};

const AuthContext = createContext({} as TAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: TAuthProviderProps) => {
    const [user, setUser] = useState("");

    const updateUser = (id: string) => {
        setUser(id);
    };

    return (
        <AuthContext.Provider
            value={{
                updateUser,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
