import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([])
   
 function fetchNotes(){
  axios.get('https://cohort2-0-ot49.onrender.com/')
      .then((res) => {
        setNotes(res.data.notes)
      })
      .catch(err => console.error(err))
 }
  useEffect(() => {
    fetchNotes()
  }, []) 

  function handleSubmit(e){
    e.preventDefault()
    const {title,description} = e.target.elements
    axios.post("https://cohort2-0-ot49.onrender.com/",{
      title:title.value,
      description:description.value
    })
    .then(()=>{
      fetchNotes()
    })

    
  }

  function handleDeleteNote(noteId){
    axios.delete(`https://cohort2-0-ot49.onrender.com/${noteId}`)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleUpdateNote(note) {
  const form = document.querySelector(".note-create-form")
  const { description } = form.elements

  if (!description.value) {
    alert("Enter description before updating")
    return
  }

  axios.patch(
    `https://cohort2-0-ot49.onrender.com/${note._id}`,
    {
      description: description.value
    }
  ).then(() => {
    fetchNotes()
    form.reset()
  })
}

  return (
    <> 

    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create note</button>
    </form>
    <div className="notes">
      {
        notes.map((note, index) => (
          <div className="note" key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
            <button onClick={()=>{handleUpdateNote(note)}}>Update note</button>
          </div>
        ))
      }
    </div> 
    </>
    
  )
}

export default App
