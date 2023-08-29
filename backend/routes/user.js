const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE - 1 : Fetch all notes of user USING GET: "/api/auth/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }


})

//ROUTE - 2 : Add Note using POST "/api/user/addnote"

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description cannot be empty').exists()
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json({ savedNote })
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }

});

//ROUTE - 3 : Update Note using PUT "/api/user/updatenote/'id'"

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        //create a newNote object
        let newNote = {}

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find the note to be updated
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send(note)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }


});

//ROUTE - 4 : Delete an existing note using DELETE "/api/user/deletenote/'id'"

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be deleted
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("not found") }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note deleted successfully", note: note})
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }


});

module.exports = router