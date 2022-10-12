import { createContext, ReactNode, useContext, useState } from "react";

type TAuthProviderProps = {
    children: ReactNode;
};

type TAuthContext = {
    updateUser: (id: string) => void;
    user: string;
    userData: TUserData;
    updateUserData: (data: TUserData) => void;
};

type TUserData = {
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    watchList: string[];
    _id: string;
};

const AuthContext = createContext({} as TAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: TAuthProviderProps) => {
    const [user, setUser] = useState("");
    const [userData, setUserData] = useState<TUserData>({} as TUserData);

    const updateUser = (id: string) => {
        setUser(id);
    };

    const updateUserData = (data: TUserData) => {
        setUserData(data);
    };
    return (
        <AuthContext.Provider
            value={{
                updateUser,
                user,
                userData,
                updateUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
