import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../utils/axiosInstance.js";
import { UserContext } from "../../context/userContext.jsx";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username === "") {
      setError("Please enter Full Name");
      return;
    }

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
    // sign up api call

    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        adminToken,
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
      <div className=" w-[90%] max-w-xl px-5 py-10 flex flex-col justify-center bg-card backdrop-blur-md shadow-xl rounded-2xl">
        <h3 className="text-2xl md:text-4xl font-bold text-text-primary text-center">
          Create an Account
        </h3>
        <p className="text-xs font-medium text-text-secondary mt-1 mb-6 text-center">
          Join us by entering your details below.
        </p>
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-text-primary text-sm md:text-base"
              >
                FullName
              </label>
              <div className="input-box">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  placeholder="John Doe"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-text-primary text-sm md:text-base"
              >
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
              <label
                htmlFor="password"
                className="text-text-primary text-sm md:text-base"
              >
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

            <div className="flex flex-col">
              <label
                htmlFor="adminToken"
                className="text-text-primary text-sm md:text-base"
              >
                Admin Invite Token
              </label>
              <div className="input-box">
                <input
                  id="adminToken"
                  name="adminToken"
                  type="text"
                  value={adminToken}
                  placeholder="6 Digit code"
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-danger text-xs pb-2">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGNUP
          </button>
        </form>
        <p className="text-xs text-text-secondary mt-3 text-center">
          Already have an account?
          <Link className="font-medium text-primary underline ml-1" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
