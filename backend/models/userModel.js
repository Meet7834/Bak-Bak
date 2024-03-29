const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
    }, { timestamps: true }
)

userSchema.methods.matchPassword = async (enteredPass) => {
    return await bcrypt.compare(enteredPass, this.password);
}

userSchema.pre('save', async (next) => {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

module.exports = User;