const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
            },
        completed: {
            type: Boolean,
            default: false
        },
        dueDate: {
            type: Date
        }
    },
    {timestamps: true} //adds createdAt / updatedAt
);

module.exports = mongoose.model('Todo', todoSchema);