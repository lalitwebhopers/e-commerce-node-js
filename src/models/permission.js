const mongoose = require('mongoose')

const PermissionSchema = mongoose.Schema({
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
    group: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }]
}, {
    timestamps: true
});


const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;