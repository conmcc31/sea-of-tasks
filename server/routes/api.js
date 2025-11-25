const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/hello (your existing test can stay)
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from Express 👋' });
});

//GET /api/todos - list all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({createdAt: -1});
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'failed to fetch todo'});
    }
})

// POST /api/todos - create a new to do
router.post('/todos', async (req, res) => {
    try {
        const {text, dueDate} = req.body;
        const todo = await Todo.create({text, dueDate: dueDate ? new Date(dueDate) : null});
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: 'Failed to create todo'});
    }
});

router.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({error: 'Todo not found'});
        }
        res.json(todo);
    } catch (err) {
        res.status(400).json({error: 'invalid id'})
    }
})

router.patch('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body; //example: {text: 'new text', completed: true)
        const todo = await Todo.findByIdAndUpdate(id, updates, {
            new: true, //returns the updated document
            runValidators: true //run schema validators on updates
        });

        if (!todo) {
            return res.status(404).json({error: 'Todo not found'});
        }
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: 'Invalid id or update data'});
    }
});

router.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({error: 'Todo not found'});
        }
        return res.status(204).end();
    } catch (err) {
        return res.status(400).json({error: 'Invalid id'})
    }
});

module.exports = router;