const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: false,
    versionKey: false
});


module.exports = mongoose.model("User", UserSchema);