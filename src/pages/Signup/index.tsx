import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: Yup.object({
            firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
            lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
            password: Yup.string()
                .max(20, "Must be 20 characters or less")
                .min(8, "Must be at least 8 characters")
                .required("Required"),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            email: Yup.string().email("Invalid email address").required("Required"),
        }),

        onSubmit: async (values) => {
            try {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/signup`, values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                navigate("/login");
                return toast.success("Your Account have been created");
            } catch (error) {
                return toast.error("Email already in use");
            }
        },
    });

    return (
        <div className="sm: flex justify-center lg:mt-4">
            <div className="border border-black w-64 text-sm my-10">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col items-center ">
                        <h1 className="text-3xl mt-3 ">Beams</h1>
                        <p className="leading-tight my-2 w-44 text-xs">
                            Personalise your experience and receive rewards & benefits from Beams. Sign Up here.
                        </p>
                        <div className="ml-5">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                className="border border-black pl-0.5 w-52"
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="text-red-600 text-xs">{formik.errors.firstName}</div>
                            ) : null}
                        </div>

                        <div className="ml-5">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                className="border border-black pl-0.5 w-52"
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="text-red-600 text-xs">{formik.errors.lastName}</div>
                            ) : null}
                        </div>

                        <div className="ml-5">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="border border-black pl-0.5 w-52"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-600 text-xs">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="ml-5">
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="border border-black pl-0.5 w-52"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-600 text-xs">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className="ml-5">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                className="border border-black pl-0.5 w-52"
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="text-red-600 text-xs">{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="bg-black text-white text-sm w-40 mt-4 p-1">
                            Sign Up
                        </button>
                        <p className=" text-xs my-2">
                            Already have an account?
                            <Link to="/login" className="text-black underline pl-2">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
