import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

  const context = useContext(noteContext)
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
  const ref = useRef(null)

  const onClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note Updated Successfully", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  return (
    <>

      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        update note
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={onClick}>Edit</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <h2 className='my-2'> Your Notes </h2>
        <div className='container'>
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes