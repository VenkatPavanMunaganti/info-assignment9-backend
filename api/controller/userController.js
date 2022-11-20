const bcrypt = require("bcryptjs");
const userService = require("../services/userService");
const validateUser = require("../validations/userValidations");

async function createUser(req, res){
    try {
        const { fullname, email, password } = req.body;
        const errorMsgs = validateUser(fullname, email, password);
        const user = await userService.findUserByMailId(email)

        if (!fullname || !email || !password) {
            res.status(501).json({
                "CreateError": `Invalid parameters, Please pass fullname, email, password`
            })
        } else {
            if (user) {
                res.status(501).json({
                    "CreateError": `User with mail id ${email} already exists`
                })
                res.send()
            } else {
                if (Object.keys(errorMsgs).length > 0) {
                    res.status(501).json(errorMsgs)
                    res.send()
                } else {
                    const salt = await bcrypt.genSalt();
                    const passwordHash = await bcrypt.hash(password, salt);
                    const savedUser = await userService.addNewUser(fullname, email, passwordHash)
                    res.json(savedUser);
                }
            }
        }

    } catch (error) {
        console.log(error["code"])
        res.status(500).json({ err: error.message });
    }
}

async function getAllUsers(req, res){
    try {
        const users= await userService.getAllUsers()
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}

async function updateUser(req, res){
    const mailId = req.params.mailid
    const { fullname, password } = req.body

    const user = await userService.findUserByMailId(mailId)
    if (!mailId || !fullname || !password) {
        res.status(501).json({
            "UpdateError": `Invalid parameters, Please pass mail id in the url, and username and password in json`
        })
    } else {
        if (!user) {
            res.status(501).json({
                "UpdateError": `User with mail id ${mailId} not exists`
            })
        } else {
            const errorMsgs = validateUser(fullname, null, password)
            if (Object.keys(errorMsgs).length > 0) {
                res.status(501).json(errorMsgs)
                res.send()
            } else {
                const salt = await bcrypt.genSalt()
                const passwordHash = await bcrypt.hash(password, salt)
                res.status(200).json(await userService.updateUser(fullname, mailId, passwordHash))
                res.send()
            }
        }
    }
}

async function deleteUser(req, res){
    const mailId = req.params.mailid
    const user = await userService.findUserByMailId(mailId)

    if (!mailId ) {
        res.status(501).json({
            "DeleteError": `Invalid parameters, Please pass mail id in the url to delete`
        })
    }else{
        if (!user) {
            res.status(501).json({
                "DeleteError": `User with mail id ${mailId} not exists`
            })
        } else {
            await userService.deleteUser(user)
            res.send(await userService.getAllUsers())
        }
    }
}

async function authenticateUser(req, res){
    const {email, password} = req.body;
    const user = await userService.findUserByMailId(email)

    if(!user){
        res.json({
            "LoginError": `Invalid email`
        })
    }else{
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if(isAuthenticated){
            res.json({
                "isAuthenticated": true,
                "fullname": user.fullname,
                "email": user.email
            })
        }else{
            res.json({
                "isAuthenticated": false
            })
        }
    }
}
module.exports = {createUser, getAllUsers, updateUser, deleteUser, authenticateUser}
