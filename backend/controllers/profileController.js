export const getProfile = async (req, res) => {
    return res.json(req.user);
};

export const updateProfile = async (req, res) => {
    try {
        const { name, avatar, theme } = req.body;

        if (theme && !["light", "dark"].includes(theme)) {
            return res.status(400).json({ message: "Invalid theme" });
        }

        if (name !== undefined) req.user.name = name;
        if (avatar !== undefined) req.user.avatar = avatar;
        if (theme !== undefined) req.user.theme = theme;

        await req.user.save();
        return res.json(req.user);
    } catch (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
