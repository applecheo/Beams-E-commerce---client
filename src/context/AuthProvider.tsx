import { createContext, ReactElement, useState } from "react";

type TAuthProviderProps = {
    children: ReactElement;
};

type TAuthContext = {
    updateUser: (email: string) => void;
    user: string;
};

const AuthContext = createContext({} as TAuthContext);

export const AuthProvider = ({ children }: TAuthProviderProps) => {
    const [user, setUser] = useState("");

    const updateUser = (email: string) => {
        setUser(email);
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
