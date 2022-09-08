const mongoose = require('mongoose');
const Permission = require('./permission');

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    permissions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Permission'
    }]
}, {
    timestamps: true
});

RoleSchema.methods.syncPermissions = async function () {
    // detach old permissions
    await Permission.updateMany({
        roles: this._id
    }, {
        $pull: {
            roles: this._id
        }
    });
    // attach new permissions
    await Permission.updateMany({
        '_id': this.permissions
    }, {
        $push: {
            roles: this._id
        }
    });
    return true;
}

RoleSchema.methods.datachPermissions = async function () {
    // detach old permissions
    await Permission.updateMany({
        roles: this._id
    }, {
        $pull: {
            roles: this._id
        }
    });
    return true;
}

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;