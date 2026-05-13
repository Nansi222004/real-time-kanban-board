import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { loading, error, userToken, user } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {

  if (userToken) {

    toast.success("Login Successful");

  navigate("/board");
  }

}, [userToken, navigate]);
  const validateField = (name, value) => {
    let err = "";

    if (name === "email") {
      if (!value) err = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) {
        err = "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value) err = "Password is required";
      else if (value.length < 6) {
        err = "Minimum 6 characters required";
      }
    }

    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    const err = validateField(name, value);
    setErrors({ ...errors, [name]: err });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    dispatch(loginUser(form));
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <div className="password-wrapper">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="password-input"
          />
          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            <i
              className={`fa-solid ${showPassword
                  ? "fa-eye-slash"
                  : "fa-eye"
                }`}
            ></i>
          </span>
        </div>

        {errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="auth-switch">
          Don't have an account?
          <span onClick={() => navigate("/signup")}> Signup here</span>
        </p>
      </form>
    </div>
  );
}

export default Login;