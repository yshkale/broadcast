import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("yshkale");
  const [password, setPassword] = useState("yash@123");

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (username && password) login(username, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        toast.success(`Logged in as ${username}`);
        navigate("app", { replace: true });
      }
    },
    [isAuthenticated, navigate, username]
  );

  return (
    <>
      <div className="flex justify-center pt-2 pb-4">
        <h1 className="text-4xl font-medium ">b.</h1>
      </div>

      <div className="px-8 py-10">
        <h2 className="text-3xl tracking-wide font-bold text-stone-100">
          Sign in to broadcast.
        </h2>
        <form className="py-8" onSubmit={handleSubmit}>
          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="text-white w-full my-4 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="primary"
            className="rounded-full bg-white text-black font-semibold w-full p-2 my-4"
          >
            Log In
          </button>
        </form>

        <p className="font-light text-sm text-stone-500">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="text-purple-500">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
