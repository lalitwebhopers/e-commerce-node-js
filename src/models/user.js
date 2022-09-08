const mongoose = require('mongoose');
const Role = require('./role');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active',
        required: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        required: true
    }
}, {
    timestamps: true
});

UserSchema.methods.syncRole = async function () {

    await Role.updateMany({
        users: this._id
    }, {
        $pull: {
            users: this._id
        }
    });
    await Role.updateMany({
        '_id': this.role
    }, {
        $push: {
            users: this._id
        }
    });
    return true;
}

UserSchema.methods.detachRole = async function () {
    await Role.updateMany({
        users: this._id
    }, {
        $pull: {
            users: this._id
        }
    });
    return true;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;