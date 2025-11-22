import { useState, useContext } from "react";
import { loginApi } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginApi(form);
            login(data.token, data.user);
            toast.success("Logged in");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="w-full border rounded p-2 dark:bg-gray-700"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        className="w-full border rounded p-2 dark:bg-gray-700"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button className="w-full bg-blue-600 text-white p-2 rounded">
                        Login
                    </button>
                </form>
                <p className="text-sm mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
