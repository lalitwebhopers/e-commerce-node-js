const User = require("../models/user");

const success = require('../responses/success')
const failed = require('../responses/failed');
const Role = require("../models/role");
const {
    arrayDifference
} = require("../helpers/array");

async function index(req, res) {
    try {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const total = await User.find().countDocuments();
        const users = await User.find({}).skip((page - 1) * perPage).limit(perPage);
        const data = {
            total: total,
            perPage: perPage,
            page: page,
            users: users
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

async function store(req, res) {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            status: req.body.status,
            password: req.body.password,
            role: req.body.role_id
        });
        await Role.updateOne({
            '_id': user.role
        }, {
            $push: {
                users: user._id
            }
        });
        res.send(success('User created.', {
            user: user
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function update(req, res) {
    try {
        const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        req.body.status ? user.status = req.body.status : null;
        req.body.password ? user.password = req.body.password : null;
        if (req.body.role_id) {
            await Role.updateOne({
                '_id': user.role
            }, {
                $pull: {
                    users: user._id
                }
            });
            user.role = req.body.role_id;
        }
        await user.save();
        if (req.body.role_id) {
            await Role.updateOne({
                '_id': user.role
            }, {
                $push: {
                    users: user._id
                }
            });
        }
        res.send(success('User updated.', {
            user: user
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function destroy(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).send(failed('User not found.', {}));
        } else {
            await user.remove();
            await Role.updateOne({
                '_id': user.role
            }, {
                $pull: {
                    users: user._id
                }
            });
            res.send(success('User deleted.', {
                user: user
            }));
        }
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}