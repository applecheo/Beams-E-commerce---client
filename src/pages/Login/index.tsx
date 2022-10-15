/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { useAuth } from "context/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
    const navigate = useNavigate();
    const { updateUser, updateUserData } = useAuth();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            password: Yup.string(),
            email: Yup.string(),
        }),

        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, values, {
                    headers: { "Content-Type": "application/json" },
                });
                navigate("/");
                const token = res.data.token;
                sessionStorage.setItem("token_key", token);
                updateUserData(res.data.user);
                updateUser(res.data.user._id);

                return toast.success("Login Successful");
            } catch (error) {
                return toast.error("Please use a valid email and password");
            }
        },
    });
    return (
        <>
            <div className="mx-32 flex justify-center">
                <div className="border border-black w-56 text-sm my-10">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col items-center ">
                            <h1 className="text-xl mt-3">Beams</h1>
                            <p style={{ fontSize: "7px", width: "150px" }} className="leading-tight my-2">
                                Ensure you’re not losing out on any rewards & benefits. Login here.{" "}
                            </p>

                            <div className="ml-3">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="border border-black pl-0.5 w-48"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-600 text-xs">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="ml-3">
                                <label htmlFor="password">Password </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="border border-black pl-0.5 w-48"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-600 text-xs">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <button type="submit" className="bg-black text-white text-sm w-32 mt-4 p-0.5">
                                Login
                            </button>
                            <p className=" text-xs my-2">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-black underline pl-2">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
