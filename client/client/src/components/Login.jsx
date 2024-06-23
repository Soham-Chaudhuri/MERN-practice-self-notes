import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitform = async (e) => {
    e.preventDefault();
    let formData = { email, password };
    let response = await axios.post("http://localhost:5000/login", formData);
    if (response.data.proceed) {
      Cookies.set("token", response.data.message, { expires: 2 });
      navigate("/posts");
    } else {
      console.log(response.data.message);
    }
  };
  return (
    <>
      <div className="w-full h-full bg-zinc-800 text-white p-10">
        <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white w-full">
          User LogIn
        </h1>
        <form className="flex flex-col gap-5">
          <input
            className="px-5 py-2 w-2/4 mx-auto bg-transparent rounded-lg border-2 border-zinc-600"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            className="px-5 py-2 w-2/4 mx-auto bg-transparent rounded-lg border-2 border-zinc-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button
            type="button"
            className="px-5 py-2 w-2/4 mx-auto bg-blue-500 rounded-lg cursor-pointer"
            onClick={submitform}
          >
            LogIn
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
