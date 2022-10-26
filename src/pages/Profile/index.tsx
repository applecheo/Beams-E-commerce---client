import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useAuth } from "context/AuthProvider";

const Profile = () => {
    const { userData } = useAuth();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();
    const deleteUser = async () => {
        if (confirmDelete === true && userData) {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/account/profile/${userData._id}` as string);
            navigate("/");
            sessionStorage.removeItem("token_key");
            window.location.reload();
        }
    };
    return (
        <div className="mx-96 flex justify-center  ">
            <div className="flex flex-col border-2 border-black w-80 my-5">
                <div className=" mt-0.5 p-2">
                    <h1 className="text-xl ">Profile</h1>
                    <h2 className="text-xs">Basic Info</h2>
                </div>
                <div className="flex p-2 ">
                    <div className="leading-tight">
                        <p>First Name</p>
                        <input type="text" defaultValue={userData.firstName} className="w-36" />
                    </div>
                    <div className=" leading-tight">
                        <p>Last Name</p>
                        <input type="text" defaultValue={userData.lastName} className="w-36" />
                    </div>
                </div>
                <div className="p-2 leading-tight">
                    <p>Email</p>
                    <input type="text" defaultValue={userData.email} className="w-36 pl-0.5" />
                </div>
                <div className="flex justify-center mt-2 mb-4">
                    {confirmDelete === false ? (
                        <button
                            className="bg-black text-white text-sm w-32 mt-4 p-0.5 hover:bg-red-600"
                            onClick={() => setConfirmDelete(true)}
                        >
                            Delete my account
                        </button>
                    ) : (
                        <button
                            className=" text-white text-sm w-32 mt-4 p-0.5 bg-red-600"
                            onClick={deleteUser}
                            onMouseLeave={() => setConfirmDelete(false)}
                        >
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
