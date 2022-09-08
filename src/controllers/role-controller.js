const Role = require("../models/role");

const success = require('../responses/success')
const failed = require('../responses/failed');
const Permission = require("../models/permission");

async function index(req, res) {
    try {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const total = await Role.find().countDocuments();
        const roles = await Role.find({}).skip((page - 1) * perPage).limit(perPage);
        const data = {
            total: total,
            perPage: perPage,
            page: page,
            roles: roles
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

async function store(req, res) {
    try {
        const role = await Role.create(req.body);
        await Permission.updateMany({
            '_id': role.permissions
        }, {
            $push: {
                roles: role._id
            }
        });
        res.send(success('Role created.', {
            role: role
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function update(req, res) {
    try {
        const role = await Role.findById(req.params.id);
        role.name = req.body.name;
        role.title = req.body.title;
        req.body.status ? role.status = req.body.status : null;
        await role.save();
        res.send(success('Role updated.', {
            role: role
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function destroy(req, res) {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            res.status(400).send(failed('Role not found.', {}));
        }
        res.send(success('Role deleted.', {
            role: role
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