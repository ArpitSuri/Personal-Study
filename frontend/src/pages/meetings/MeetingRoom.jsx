import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getMeeting } from "../../api/meetings";
import Navbar from "../../components/Navbar";

const JITSI_DOMAIN = import.meta.env.VITE_JITSI_DOMAIN || "meet.jit.si";

const loadJitsiScript = () =>
    new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) return resolve();
        const script = document.createElement("script");
        script.src = `https://${JITSI_DOMAIN}/external_api.js`;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Could not load video service"));
        document.body.appendChild(script);
    });

export default function MeetingRoom() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let api;
        let cancelled = false;

        (async () => {
            try {
                const { data } = await getMeeting(id);
                await loadJitsiScript();
                if (cancelled || !containerRef.current) return;

                setTitle(data.title);
                api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
                    roomName: data.roomName,
                    parentNode: containerRef.current,
                    width: "100%",
                    height: "100%",
                    userInfo: { displayName: user.name, email: user.email },
                    configOverwrite: { prejoinPageEnabled: false },
                });
                api.addListener("readyToClose", () => navigate("/meetings"));
            } catch (e) {
                if (!cancelled) setError(e.response?.data?.message || e.message);
            }
        })();

        return () => {
            cancelled = true;
            api?.dispose();
        };
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="flex h-screen flex-col p-4">
                <h1 className="mb-3 text-lg font-semibold text-white">{title || "Joining…"}</h1>
                {error
                    ? <p className="text-red-400">{error}</p>
                    : <div ref={containerRef} className="min-h-0 flex-1 overflow-hidden rounded-xl border border-gray-800" />}
            </div>
        </>
    );
}