require('dotenv').config();
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Regular expression for a strong password (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function(v) {
                return strongPasswordRegex.test(v);
            },
            message: props => `${props.value} is not a valid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        },
    },

    list: {
        type: Schema.Types.ObjectId,
        ref: 'List', 
    }
});


UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
};

// Generate a JWT token for the user
UserSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, list: this.list }, process.env.JWT_SECRET_KEY, { expiresIn: '12day' });
    return token;
};


const User = model('User', UserSchema);

module.exports = User;
