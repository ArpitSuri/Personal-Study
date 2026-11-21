export const isAdminUser = (user) => {
    const listed = (process.env.ADMIN_EMAILS || "")
        .split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
    return user?.role === "admin" || listed.includes(user?.email);
};