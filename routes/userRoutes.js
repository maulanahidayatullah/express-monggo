const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE: Tambah user baru
router.post("/", async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const age = req.body.age;

        await User.create({
            name: name,
            email: email,
            age: age
        });

        return res.json({
            status_code: 200,
            message: "Success Create Users Data"
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ: Ambil semua user
router.get("/", async (req, res) => {
    try {
        const name = req.headers.name;

        let users;
        if (name) {
            users = await User.find({ name: name });
        } else {
            users = await User.find();
        }

        return res.json({
            status_code: 200,
            message: "Success Retrieve Users Data",
            rows: users
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/name", async (req, res) => {
    try {
        const name = req.headers.name;

        let user;
        if (name) {
            // Cari berdasarkan name dan ambil data terakhir berdasarkan createdAt
            user = await User.findOne({ name: name }).sort({ createdAt: -1 });
        } else {
            return res.status(400).json({
                status_code: 400,
                message: "Name header is required"
            });
        }

        if (!user) {
            return res.status(404).json({
                status_code: 404,
                message: "User not found"
            });
        }

        return res.json({
            status_code: 200,
            message: "Success Retrieve Users Data",
            rows: user
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Edit user berdasarkan ID
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Hapus user berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
