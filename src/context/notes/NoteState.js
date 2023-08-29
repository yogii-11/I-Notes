import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const initialiseNotes = []

  const [notes, setNotes] = useState(initialiseNotes)

  //Fetch all notes
  const getNotes = async () => {
    const url = `${host}/api/user/fetchallnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/user/addnote`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = response.json()
    setNotes(notes.concat(note))
    getNotes(setNotes)
  }

  //delete a note
  const deleteNote = async (id) => {

    const url = `${host}/api/user/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = response.json()
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }

  //edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/user/updatenote/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json()
    

    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;