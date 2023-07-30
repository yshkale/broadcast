import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users, { addUser } from "../dB/users";
import { toast } from "react-hot-toast";

function Signup() {
  const [currentUser, setCurrentUser] = useState({
    id: Math.floor(Math.random() * 1000),
    username: "",
    password: "",
    name: "",
    email: "broadcast@gmail.com",
    bio: "",
    profilePic: "",
    website: "",
    location: "",
    followers: [],
    following: [],
  });

  const [confirmPassword, setCurrentPassword] = useState("");

  function handleChange(e) {
    let { name, value } = e.target;

    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isUsernameExists = users.some(
      (u) => u.username === currentUser.username.toLowerCase()
    );

    if (isUsernameExists) {
      toast.error(
        "This username is taken. Please choose a different username."
      );
      return;
    }

    if (currentUser.password !== confirmPassword) {
      return toast.error("Passwords did not match");
    }

    addUser(currentUser);

    navigate("/create-profile");
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="px-8 pt-4">
        <h1 className="text-base font-medium ">Step 1 of 2</h1>
      </div>

      <div className="px-8 mt-8">
        <h2 className="text-3xl tracking-wide font-bold text-stone-100">
          Create your account
        </h2>

        <form className="py-6" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="text"
            name="name"
            value={currentUser.name}
            placeholder="Name"
            onChange={(e) => handleChange(e)}
            required
          />

          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="text"
            name="username"
            value={currentUser.username}
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            required
          />

          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="password"
            name="password"
            value={currentUser.password}
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            required
          />

          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <button className="rounded-full bg-white text-center text-black font-semibold w-full p-2 mt-4">
            Next
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
