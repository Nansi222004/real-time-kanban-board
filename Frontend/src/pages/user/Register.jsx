import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const validateField = (name, value) => {

    let err = "";
    if (name === "name") {

      const trimmedValue = value.trim();

      if (!trimmedValue) {

        err = "Name is required";

      }

      else if (trimmedValue.length < 3) {

        err =
          "Name must be at least 3 characters";

      }

      else if (
        !/^[A-Za-z\s]+$/.test(trimmedValue)
      ) {

        err =
          "Name should contain only letters";
      }
    }

    if (name === "email") {

      const trimmedValue = value.trim();

      if (!trimmedValue) {

        err = "Email is required";

      }

      else if (
        !/^\S+@\S+\.\S+$/.test(trimmedValue)
      ) {

        err = "Invalid email format";
      }
    }
    if (name === "password") {

      const trimmedValue = value.trim();

      if (!trimmedValue) {

        err = "Password is required";

      }

      else if (trimmedValue.length < 6) {

        err =
          "Password must be at least 6 characters";
      }
    }

    if (name === "confirmPassword") {

      const trimmedValue = value.trim();

      if (!trimmedValue) {

        err =
          "Confirm password is required";

      }

      else if (
        trimmedValue !== form.password.trim()
      ) {

        err = "Passwords do not match";
      }
    }

    return err;
  };



  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });

    const err = validateField(
      name,
      value
    );

    setErrors({
      ...errors,
      [name]: err,
    });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    let newErrors = {};

    Object.keys(form).forEach((key) => {

      newErrors[key] = validateField(
        key,
        form[key]
      );
    });

    setErrors(newErrors);
    if (
      Object.values(newErrors).some(
        (err) => err !== ""
      )
    ) {
      return;
    }
    const cleanedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };
    try {
      const result = await dispatch(
        signupUser(cleanedForm)
      ).unwrap();

     toast.success("Signup Successful");

      navigate("/login");

    } catch (err) {

      toast.error(err);
    }
  };
  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        {
          errors.name &&
          <p className="error">
            {errors.name}
          </p>
        }
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        {
          errors.email &&
          <p className="error">
            {errors.email}
          </p>
        }
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
          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {
              showPassword
                ? <FaEyeSlash />
                : <FaEye />
            }
          </span>

        </div>

        {
          errors.password &&
          <p className="error">
            {errors.password}
          </p>
        }
        <div className="password-wrapper">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {
              showConfirmPassword
                ? <FaEyeSlash />
                : <FaEye />
            }
          </span>

        </div>

        {
          errors.confirmPassword &&
          <p className="error">
            {errors.confirmPassword}
          </p>
        }
        <button
          type="submit"
          disabled={loading}
        >
          {
            loading
              ? "Signing up..."
              : "Signup"
          }
        </button>
        {
          error &&
          <p className="error">
            {error}
          </p>
        }
        <p className="auth-switch">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;