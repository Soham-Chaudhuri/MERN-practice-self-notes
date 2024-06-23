import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Posts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postData, setPostData] = useState([]);
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    let response = await axios.post("http://localhost:5000/posts");
    let data = response.data.allPosts;
    // console.log(data);
    setPostData(data);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const submitform = async () => {
    let newPostData = { title, imageURL,token: Cookies.get("token") };
    let response = await axios.post(
      "http://localhost:5000/newPost",
      newPostData
    );
    if (response.data.proceed) {
      fetchData();
    } else {
      console.log(response.data.message);
    }
  };
  const logout = () =>{
    Cookies.remove("token");
    navigate('/login');
  }
  return (
    <>
      {isLoggedIn ? (
        <div class="w-full h-full bg-zinc-800 text-white p-10">
          <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white w-2/4 mx-auto">
            All Users Posts
          </h1>
          <form className="flex flex-col gap-5">
            <input
              className="px-5 py-2 w-2/4 mx-auto bg-transparent rounded-lg border-2 border-zinc-600"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <input
              className="px-5 py-2 w-2/4 mx-auto bg-transparent rounded-lg border-2 border-zinc-600"
              type="text"
              placeholder="Image Url"
              value={imageURL}
              onChange={(e) => {
                setImageURL(e.target.value);
              }}
              required
            />
            <button
              type="button"
              className="px-5 py-2 w-2/4 mx-auto bg-blue-500 rounded-lg cursor-pointer"
              onClick={submitform}
            >
              Create Post
            </button>
            <button
              type="button"
              className="px-5 py-2 w-2/4 mx-auto bg-blue-500 rounded-lg cursor-pointer"
              onClick={logout}
            >
              Log Out
            </button>
          </form>
          <div class="users flex flex-wrap gap-4 mt-10">
            {postData.length > 0 ? (
              postData.map((val) => (
                <div className="user p-4 bg-zinc-600 rounded-lg">
                  <div className="w-full h-72 rounded-lg bg-zinc-500 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={val.imageURL}
                      alt=""
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-normal lg:text-xl">
                    {val.username}
                  </h3>
                  <h5 className="mt-1 text-lg font-normal text-zinc-600 lg:text-xl dark:text-gray-400">
                    {val.email}
                  </h5>
                  <div className="flex justify-between mt-10">
                    <a className="text-zinc-300" href={`/edit/${val._id}`}>
                      Edit User
                    </a>
                    <a className="text-red-400" href={`/delete/${val._id}`}>
                      Delete User
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="mt-3 text-6xl font-normal lg:text-xl">
                No Users Yet
              </h3>
            )}
          </div>
        </div>
      ) : (
        <div>login first</div>
      )}
    </>
  );
}

export default Posts;
