const User = require("../models/user");

const success = require('../responses/success')
const failed = require('../responses/failed');

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
        const user = await User.create(req.body);
        await user.syncRole();
        res.send(success('User created.', {
            user: user
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function update(req, res) {
    try {
        await User.updateOne({
            '_id': req.params.id
        }, req.body);
        const user = await User.findById(req.params.id);
        await user.syncRole();
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
        await user.remove();
        await user.detachRole();
        res.send(success('User deleted.', {
            user: user
        }));
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