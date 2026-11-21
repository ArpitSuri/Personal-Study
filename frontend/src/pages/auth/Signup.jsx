// import { useState, useContext } from "react";
// import { signupApi } from "../../api/auth";
// import { AuthContext } from "../../context/AuthContext";
// import { toast } from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import AuthLayout from "../../components/auth/AuthLayout";
// import AuthField, { MailIcon, LockIcon, UserIcon } from "../../components/auth/AuthField";
// import GoogleAuthButton from "../../components/GoogleAuthButton";

// export default function Signup() {
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [form, setForm] = useState({ name: "", email: "", password: "" });
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await signupApi(form);
//             login(data.token, data.user);
//             toast.success("Account created");
//             navigate("/");
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Signup failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <AuthLayout
//             title="Create your account"
//             subtitle="Start organising your learning in minutes."
//             footer={<>Already have an account? <Link to="/login" className="font-medium text-white underline-offset-4 hover:underline">Log in</Link></>}
//         >
//             <form className="space-y-5" onSubmit={handleSubmit}>
//                 <AuthField
//                     label="Name" icon={<UserIcon />} placeholder="Your name"
//                     autoComplete="name" required
//                     value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//                 <AuthField
//                     label="Email" type="email" icon={<MailIcon />} placeholder="you@example.com"
//                     autoComplete="email" required
//                     value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//                 <AuthField
//                     label="Password" type="password" icon={<LockIcon />} placeholder="At least 6 characters"
//                     autoComplete="new-password" minLength={6} required
//                     value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />
//                 <button
//                     disabled={loading}
//                     className="h-11 w-full rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
//                 >
//                     {loading ? "Creating account…" : "Create account"}
//                 </button>
//             </form>
//             <GoogleAuthButton />
//         </AuthLayout>
//     );
// }

import { useState, useContext } from "react";
import { signupApi } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthField from "../../components/auth/AuthField";
import GoogleAuthButton from "../../components/GoogleAuthButton";

export default function Signup() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await signupApi(form);
            login(data.token, data.user);
            toast.success("Account created");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="It takes a few seconds."
            footer={<>Already have an account? <Link to="/login" className="text-accent underline-offset-4 hover:underline">Log in</Link></>}
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <AuthField
                    label="Name" autoComplete="name" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <AuthField
                    label="Email" type="email" autoComplete="email" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <AuthField
                    label="Password (at least 6 characters)" type="password" autoComplete="new-password" minLength={6} required
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    disabled={loading}
                    className="h-11 w-full rounded-md bg-accent text-sm font-semibold text-canvas transition hover:bg-accent-400 disabled:opacity-50"
                >
                    {loading ? "Creating account…" : "Create account"}
                </button>
            </form>
            <GoogleAuthButton />
        </AuthLayout>
    );
}