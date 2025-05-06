import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { UserContext } from "../../context/userContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password === "") {
      setError("Please enter the password");
      return;
    }

    setError("");
    // log in api call
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="bg-background min-h-dvh flex justify-center items-center">
      <div className=" w-[90%] max-w-md px-5 py-10 flex flex-col justify-center bg-card backdrop-blur-md shadow-xl rounded-2xl">
        <h3 className="text-5xl font-semibold text-text-primary text-center">
          Welcome
        </h3>
        <p className="text-sm text-text-secondary mt-1 mb-6 text-center">
          Please enter your details
        </p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-text-primary text-sm">
              Email Address
            </label>
            <div className="input-box">
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-text-primary text-sm">
              Password
            </label>
            <div className="input-box">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
              {showPassword ? (
                <VisibilityOffIcon
                  className="cursor-pointer text-primary"
                  onClick={toggleShowPassword}
                />
              ) : (
                <VisibilityIcon
                  className="cursor-pointer text-primary"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
          </div>
          {error && <p className="text-danger text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
        </form>
        <p className="text-xs text-text-secondary mt-3 text-center">
          Don't have an account?
          <Link
            className="font-medium text-primary underline ml-1"
            to="/signup"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
