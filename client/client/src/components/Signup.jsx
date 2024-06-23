import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  const submitform = async (e) => {
    e.preventDefault();
    let formData = { username, email, password,  };
    let response = await axios.post("http://localhost:5000/create", formData);
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
          User SignUp
        </h1>
        <form className="flex flex-col gap-5">
          <input
            className="px-5 py-2 w-2/4 mx-auto bg-transparent rounded-lg border-2 border-zinc-600"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
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
          {/* <input
            className="px-5 py-2 w-2/4 mx-auto bg-transparent rounded-lg border-2 border-zinc-600"
            type="text"
            placeholder="Image Url"
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.target.value);
            }}
            required
          /> */}
          <button
            type="button"
            className="px-5 py-2 w-2/4 mx-auto bg-blue-500 rounded-lg cursor-pointer"
            onClick={submitform}
          >
            SignUp
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
