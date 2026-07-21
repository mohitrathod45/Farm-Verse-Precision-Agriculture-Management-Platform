import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  RiPlantLine,
  RiMailLine,
  RiLockPasswordLine,
  RiErrorWarningLine,
} from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Save JWT Token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("role", response.data.role);

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Invalid Email or Password");
      } else {
        alert("Unable to connect to server");
      }

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col font-sans text-text-dark">
      <div className="w-full p-6 sm:p-8 flex justify-center sm:justify-start">
        <Link to="/" className="flex items-center space-x-2">
          <RiPlantLine className="text-3xl text-primary" />
          <span className="text-2xl font-bold tracking-tight text-text-dark">
            Farm<span className="text-primary font-extrabold">Verse</span>
          </span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 w-full max-w-md p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-500">
              Sign in to manage your digital farm.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">

                <RiMailLine className="absolute left-3 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border rounded-lg pl-10 pr-4 py-3"
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <RiErrorWarningLine className="mr-1" />
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <div className="relative">

                <RiLockPasswordLine className="absolute left-3 top-4 text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg pl-10 pr-4 py-3"
                />

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <RiErrorWarningLine className="mr-1" />
                  {errors.password}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-6">

            <p>
              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-green-600 font-bold"
              >
                Register
              </Link>

            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;