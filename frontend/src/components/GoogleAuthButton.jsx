// import { useContext } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { AuthContext } from "../context/AuthContext";
// import { googleLoginApi } from "../api/auth";

// export default function GoogleAuthButton() {
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSuccess = async ({ credential }) => {
//         try {
//             const { data } = await googleLoginApi(credential);
//             login(data.token, data.user);
//             toast.success("Logged in with Google");
//             navigate("/");
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Google login failed");
//         }
//     };

//     return (
//         <div className="mt-6 flex flex-col items-center gap-5">
//             <div className="flex w-full items-center gap-3 text-xs uppercase tracking-wider text-gray-600">
//                 <span className="h-px flex-1 bg-gray-800" />
//                 or continue with
//                 <span className="h-px flex-1 bg-gray-800" />
//             </div>
//             <GoogleLogin
//                 onSuccess={handleSuccess}
//                 onError={() => toast.error("Google login failed")}
//                 theme="filled_black"
//                 size="large"
//                 shape="pill"
//                 text="continue_with"
//             />
//         </div>
//     );
// }


import { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { googleLoginApi } from "../api/auth";

export default function GoogleAuthButton() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSuccess = async ({ credential }) => {
        try {
            const { data } = await googleLoginApi(credential);
            login(data.token, data.user);
            toast.success("Logged in with Google");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Google login failed");
        }
    };

    return (
        <div className="mt-6">
            <div className="flex items-center gap-3 text-sm text-ink/50">
                <span className="h-px flex-1 bg-ink/10" />
                or
                <span className="h-px flex-1 bg-ink/10" />
            </div>
            <div className="mt-5 flex justify-start">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => toast.error("Google login failed")}
                    theme="filled_black"
                    size="large"
                    shape="rectangular"
                    text="continue_with"
                />
            </div>
        </div>
    );
}