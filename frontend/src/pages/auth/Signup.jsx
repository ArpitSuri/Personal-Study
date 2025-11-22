import { useState, useContext } from "react";
import { signupApi } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signupApi(form);
            login(data.token, data.user);
            toast.success("Account created");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full border rounded p-2 dark:bg-gray-700"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
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
                        Signup
                    </button>
                </form>
                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
