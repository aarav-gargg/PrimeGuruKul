import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:3000/user/login",{email , password})
            if (resp.status === 200) {
                alert("YOU'VE BEEN LOGGED IN");
                console.log(resp)
                navigate('/', {
                    state: { email: resp.data.data.email, name: resp.data.data.name },
                });
            } else {
                alert("Invalid Email or Password");
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
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
  
            <div className="relative md:w-7/12 w-full">
                <img
                    src="./img2.jpg"
                    className="h-full w-full object-cover"
                    alt="Login Background"
                />
                <div className="absolute inset-0 bg-black opacity-40 md:hidden"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center md:static md:w-5/12 w-full bg-white bg-opacity-90 md:bg-transparent">
                <form
                    className="bg-white p-8 shadow-lg rounded-md max-w-md w-full space-y-6"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-3xl font-bold text-center">Login</h1>
                    <p className="text-center text-gray-600">
                        Welcome Back!! Login Now
                    </p>

                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            required
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>

                    <div className="text-center">
                        Not a member yet?{' '}
                        <Link to="/Signup" className="text-blue-500 hover:underline">
                            Sign up here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

