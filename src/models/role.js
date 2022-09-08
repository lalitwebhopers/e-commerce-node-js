const mongoose = require('mongoose')

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

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;