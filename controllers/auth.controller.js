const fs = require('fs-extra');
const { registerSchema } = require('../validators');
const db = require('../models');
const { hashPassword } = require('../Utils').passwordUtils;

async function register(req, res){
    try {
        const { error, value : data } = await registerSchema.validate(req.body);
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
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email){
            return res.status(409).json({ success: false, error: 'Email already exists' })
        }
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

async function signin(req, res){
    try {
        
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

async function signout(req, res){
    try {
        
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

module.exports = {
    register,
    signin,
    signout,
}