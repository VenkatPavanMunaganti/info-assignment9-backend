const User = require("../models/userModel");

async function addNewUser(fullname, email, passwordHash){
    const newUser = new User({
        fullname: fullname,
        email: email,
        password: passwordHash,
    });

    const savedUser = await newUser.save();
    return savedUser
}

async function getAllUsers(){
    const users = await User.find({})
    return users
}

async function updateUser(fullname, email, passwordHash){
    const user = await findUserByMailId(email)
    user.fullname = fullname
    user.password = passwordHash
    await user.save()
    return user
}

async function deleteUser(user){
    await user.remove()
}

async function findUserByMailId(mailid) {
    try {
        const user = await User.findOne({ email: mailid })
        return user
    } catch (error) {
        console.log(error)
    }
}

module.exports = {addNewUser, updateUser, getAllUsers, deleteUser, findUserByMailId}