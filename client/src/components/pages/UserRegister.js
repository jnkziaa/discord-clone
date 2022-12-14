import React, {useState} from 'react';
import Cookies from "universal-cookie/es6";
import {Link} from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

const initialState = { //basically an empty constructor for the initialState
    username: " ",
    password: " ",
    confirmPassword: " ",
    email: " ",
}


function UserRegister() {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value}); //updates the statefield
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {email, username, password,} = form;
        const URL = "http://localhost:5000/auth";


        const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/signup`, {
            username, password, email,
        });


        cookies.set("token", token);
        cookies.set("username", username);
        cookies.set("email", email);
        cookies.set("userId", userId);
        cookies.set("hashedPassword", hashedPassword);

        window.location.reload();
    }
    return (
        <div
            className="bg-[url('https://i.imgur.com/eCB4uA8.jpg')] h-screen w-screen bg-cover flex flex-row justify-center items-center">
            <div className="w-2/5 h-1/2 bg-gray-700 rounded-lg shadow-lg flex flex-col gap-7">
                <h1 className="flex items-center justify-center text-gray-200 font-extrabold text-4xl pt-5"> Create an
                    account </h1>
                <form className="pt-0 font-semibold flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="pl-60 flex justify-center flex-col">
                        <label htmlFor="email" className="pl-1 text-gray-300 text-sm"> EMAIL</label>
                        <input type="email" name="email" placeholder=""
                               className=" pl-5 w-96 flex-1 py-2 rounded-lg border-b-2 border-gray-400 focus:border-green-400
                      text-black placeholder-black
                      outline-none" onChange={handleChange} required={true} />
                    </div>
                    <div className="pl-60 flex justify-center flex-col">
                        <label htmlFor="username" className="pl-1 text-gray-300 text-sm"> USERNAME</label>
                        <input type="text" name="username" placeholder=""
                               className=" pl-5 w-96 flex-1 py-2 rounded-lg border-b-2 border-gray-400 focus:border-green-400
                      text-black placeholder-black
                      outline-none" onChange={handleChange} required={true} />
                    </div>
                    <div className="pl-60 flex justify-center flex-col">
                        <label htmlFor="password" className="pl-1 text-gray-300 text-sm"> PASSWORD</label>
                        <input type="password" name="password" placeholder=""
                               className=" pl-5 w-96 flex-1 py-2 rounded-lg border-b-2 border-gray-400 focus:border-green-400
                      text-black placeholder-black
                      outline-none" onChange={handleChange} required={true} />
                    </div>
                    <div className="pl-60 flex justify-center flex-col">
                        <label htmlFor="confirmPassword" className="pl-1 text-gray-300 text-sm"> CONFIRM PASSWORD</label>
                        <input type="password" name="confirmPassword" placeholder=""
                               className=" pl-5 w-96 flex-1 py-2 rounded-lg border-b-2 border-gray-400 focus:border-green-400
                      text-black placeholder-black
                      outline-none" onChange={handleChange} required={true} />
                    </div>
                    <div className="pl-2  flex items-center justify-center flex-col">
                        <button className="bg-discord_blue p-3 rounded-lg text-xs px-44 md:text-sm focus:outline-none
                 hover:shadow-2xl font-semibold hover:text-discord_blurple transition duration-200 ease-in-out
                 whitespace-nowrap"> Log in
                        </button>
                        <div className="pt-5 text-gray-200">
                            <label> Already have an account? </label>
                            <Link to="/login">
                                <label className="hover:text-discord_blurple text-discord_blurple cursor-pointer focus:outline-none"> Login </label>
                            </Link>
                        </div>
                        <label className="pb-4 text-gray-400"> By registering, you agree to Discord's Terms of Service and Privacy Policy </label>
                    </div>
                </form>


            </div>

        </div>
    );
}

export default UserRegister;