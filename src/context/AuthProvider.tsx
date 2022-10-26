import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

type TAuthProviderProps = {
    children: ReactNode;
};

type TAuthContext = {
    updateUser: (id: string) => void;
    user: string;
    userData: TUserData;
    updateUserData: (data: TUserData) => void;
    updateWishlist: (productId: string) => void;
};

type TUserData = {
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    wishList: string[];
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

    const updateWishlist = async (productId: string) => {
        if (user) {
            const body = { userId: user };
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/account/wishlist/${productId}` as string, body);
            if (userData.wishList.includes(productId) === false) {
                setUserData((prev) => {
                    return { ...prev, wishList: [...prev.wishList, productId] };
                });
            } else {
                setUserData((prev) => {
                    const wishList = prev.wishList.filter((x) => x !== productId);
                    return { ...prev, wishList: wishList };
                });
            }
        } else {
            toast.error("Please Login");
        }
    };
    return (
        <AuthContext.Provider
            value={{
                updateUser,
                user,
                userData,
                updateUserData,
                updateWishlist,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
