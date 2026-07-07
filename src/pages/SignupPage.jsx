import { useState } from "react";
import todoLogo from "../assets/todo-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/authActions";
import { signupSchema } from "../validations/authSchema";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(form, { abortEarly: false });
      setErrors({});
      const result = await dispatch(
        signupUser({ username: form.name, email: form.email, password: form.password })
      );

      if (result.success) {
        const user = result.data.user || {};
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.username || form.name);
        window.dispatchEvent(new Event("authChanged"));
        navigate("/tasks");
      }
    } catch (err) {
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="bg-slate-950 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={todoLogo} alt="Your Company" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
