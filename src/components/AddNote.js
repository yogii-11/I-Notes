import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const AddNote = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note added Successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <div className='container my-2'>
                <h2>Add a note :</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={AddNote}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote