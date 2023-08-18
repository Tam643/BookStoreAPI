const fs = require('fs-extra');
const { registerSchema, loginFormSchema } = require('../validators');
const db = require('../models');
const { secretKey, jwt } = require('../configs/jwt.config')
const { hashPassword, verifyPassword } = require('../Utils').passwordUtils;

async function register(req, res) {
    try {
        const { error, value: data } = await registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: 'The request data is invalid.' })
        }
        const { salt, hash } = await hashPassword(data.password);
        delete data.password;
        delete data.confirmpassword;
        data.password_hashed = hash;
        data.salt = salt;
        await db.user.create(data);
        return res.status(201).json({ success: true, message: 'Create new book successfuly' })
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ success: false, error: 'Email already exists' })
        }
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

async function signin(req, res) {
    try {
        const { error, value: data } = await loginFormSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: 'The request data is invalid.' })
        }
        const user = await db.user.findOne({ email: data.email });
        if (user) {
            const isCorrectPassword = await verifyPassword(user.password_hashed, data.password);
            if (isCorrectPassword) {
                const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
                return res.status(200).json({ success: true, token:token })
            } else {
                return res.status(401).json({ success: false, error: 'Invalid credentials' })
            }
        }else{
            return res.status(401).json({ success: false, error: 'Invalid credentials' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

module.exports = {
    register,
    signin,
}