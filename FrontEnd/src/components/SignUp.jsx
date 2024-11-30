import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [SignupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        conpassword: '',
        dob: '', 
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate user age (optional, e.g., 18 years minimum)
        const age = new Date().getFullYear() - new Date(SignupData.dob).getFullYear();
        if (age < 18) {
            alert('You must be at least 18 years old to sign up.');
            return;
        }

        setIsLoading(true); // Set loading to true
        try {
            const respo = await axios.post("http://localhost:3000/user/signup", SignupData);
            
            if (respo.status === 201) {
                alert('User created successfully');
                navigate('/');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response) {
                alert(error.response.data.message || "An error occurred during registration.");
            } else if (error.request) {
                alert("No response from server. Please try again later.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...SignupData,
            [name]: value,
        });
    };

    useEffect(() => {
        setPasswordMatch(
            SignupData.password === SignupData.conpassword || SignupData.conpassword === ''
        );
    }, [SignupData]);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="relative md:w-7/12 w-full">
                <img
                    src="./img1.jpg"
                    className="h-full w-full object-cover"
                    alt="Signup Background"
                />
                <div className="absolute inset-0 bg-black opacity-40 md:hidden"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center md:static md:w-5/12 w-full bg-white bg-opacity-90 md:bg-transparent">
                <form
                    className="bg-white p-8 shadow-lg rounded-md max-w-md w-full space-y-6"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                    <p className="text-center text-gray-600">
                        Create an Account now!
                    </p>

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={SignupData.name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={SignupData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="date"
                            name="dob"
                            value={SignupData.dob}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={SignupData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            name="conpassword"
                            value={SignupData.conpassword}
                            onChange={handleChange}
                            placeholder="Confirm your Password"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {!passwordMatch && (
                            <p className="text-sm text-red-600">Passwords do not match.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={
                            isLoading ||
                            !passwordMatch ||
                            !SignupData.name ||
                            !SignupData.email ||
                            !SignupData.password ||
                            !SignupData.conpassword ||
                            !SignupData.dob
                        }
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>

                    <div className="text-center">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Log in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
