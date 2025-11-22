import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await logout();
            navigate("/login");
        } finally {
            setLoggingOut(false);
        }
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        {
            path: "/", label: "Dashboard", icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            path: "/profile", label: "Profile", icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
    ];

    return (
        <>
            <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 1px;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: #fff;
        }
        .glass-nav {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .logo-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mobile-menu {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>

            <nav className="glass-nav sticky top-0 z-50 border-b border-gray-700/50 shadow-lg shadow-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                        >
                            <div className="p-2 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg sm:text-xl logo-gradient">
                                Personal Study
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                                            ? 'active text-white bg-gray-700/50'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                                        }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}

                            {user && (
                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
                                    {/* User Avatar */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                                            <img src={user.avatar} alt="" />
                                        </div>
                                        <span className="text-sm text-gray-300 hidden lg:block max-w-[120px] truncate">
                                            {user.name || user.email}
                                        </span>
                                    </div>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loggingOut ? (
                                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        )}
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu md:hidden border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-lg">
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all animate-fade-in ${isActive(link.path)
                                            ? 'text-white bg-gray-700/50'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                                        }`}
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}

                            {user && (
                                <>
                                    <div className="my-3 border-t border-gray-700/50" />

                                    {/* User Info */}
                                    <div className="flex items-center gap-3 px-4 py-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                            <img src={user.avatar || "https://api.dicebear.com/9.x/avataaars/svg?seed=Nolan"} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Logout Button */}
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        disabled={loggingOut}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium transition-all animate-fade-in disabled:opacity-50 cursor-pointer"
                                        style={{ animationDelay: '0.15s' }}
                                    >
                                        {loggingOut ? (
                                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        )}
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}