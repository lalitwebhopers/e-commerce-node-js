const Permission = require("../models/permission");

const success = require('../responses/success')
const failed = require('../responses/failed');
const Role = require("../models/role");

async function index(req, res) {
    try {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const total = await Permission.find().countDocuments();
        const permissions = await Permission.find({}).skip((page - 1) * perPage).limit(perPage);
        const data = {
            total: total,
            perPage: perPage,
            page: page,
            permissions: permissions
        };
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

async function store(req, res) {
    try {
        const permission = await Permission.create({
            name: req.body.name,
            title: req.body.title,
            group: req.body.group
        });
        res.send(success('Permission created.', {
            permission: permission
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function update(req, res) {
    try {
        const permission = await Permission.findById(req.params.id);
        permission.name = req.body.name;
        permission.title = req.body.title;
        permission.group = req.body.group;
        await permission.save();
        res.send(success('Permission updated.', {
            permission: permission
        }));
    } catch (error) {
        res.send(failed('Something went wrong.', error));
    }
}

async function destroy(req, res) {
    try {
        const permission = await Permission.findById(req.params.id);
        if (!permission) {
            res.status(400).send(failed('Permission not found.', {}));
        } else {
            await Role.updateMany({
                '_id': permission.roles
            }, {
                $pull: {
                    permissions: permission._id
                }
            });
            await permission.remove();
            res.send(success('Permission deleted.', {
                permission: permission
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