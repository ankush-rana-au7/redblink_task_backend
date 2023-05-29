const UserModel = require('../models/user')

module.exports.signup = async (req, res) => {
console.log(req.body.email)
    // email should not exist alreday
    const findEmail = await UserModel.find({ email: req.body.email });
    console.log({findEmail})
    if(findEmail.length<=0){
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await newUser.save().then(() => {
        res.send({ code: 200, message: 'Signup Success' })
    }).catch((err) => {
        res.send({ code: 500, message: 'Signup Error' })
    })
}
else {
    res.send({ code: 403, message: 'User Already Exists' }) 
}
}

module.exports.login = (req, res) => {

    // email and password match

    UserModel.findOne({ email: req.body.email })
        .then(result => {
            console.log(result, '11')

            // match password with req.body.password
            if (result.password !== req.body.password) {
                res.send({ code: 404, message: 'Enter correct password' })
            } else {
                res.send({
                    name: result.name,
                    email: result.email,
                    code: 200,
                    message: 'User Found',
                    token: 'hfgdhg'
                })
            }

        })
        .catch(err => {
            res.send({ code: 500, message: 'User Not Found' })
        })

}

