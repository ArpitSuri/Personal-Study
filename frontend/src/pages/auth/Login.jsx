import { useState, useContext } from "react";
import { loginApi } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthField from "../../components/auth/AuthField";
import GoogleAuthButton from "../../components/GoogleAuthButton";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await loginApi(form);
            login(data.token, data.user);
            toast.success("Logged in");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Log in"
            subtitle="Pick up where you left off."
            footer={<>New here? <Link to="/signup" className="text-accent underline-offset-4 hover:underline">Create an account</Link></>}
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <AuthField
                    label="Email" type="email" autoComplete="email" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <AuthField
                    label="Password" type="password" autoComplete="current-password" required
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    disabled={loading}
                    className="h-11 w-full rounded-md bg-accent text-sm font-semibold text-canvas transition hover:bg-accent-400 disabled:opacity-50"
                >
                    {loading ? "Logging in…" : "Log in"}
                </button>
            </form>
            <GoogleAuthButton />
        </AuthLayout>
    );
}