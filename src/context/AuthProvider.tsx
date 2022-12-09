import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

type TAuthProviderProps = {
    children: ReactNode;
};

export type TAuthContext = {
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

export const AuthContext = createContext({} as TAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: TAuthProviderProps) => {
    const [userData, setUserData] = useState<TUserData>({} as TUserData);
    const TOKEN = sessionStorage.getItem("token_key");

    useEffect(() => {
        if (TOKEN) {
            const reLogin = async () => {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/relogin`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                const userData = await res.data.user;
                updateUserData(userData);
            };
            reLogin();
        }
    }, []);
    const updateUserData = (data: TUserData) => {
        setUserData(data);
    };

    const updateWishlist = async (productId: string) => {
        if (userData) {
            const body = { userId: userData._id };
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/account/wishlist/${productId}` as string, body, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
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
