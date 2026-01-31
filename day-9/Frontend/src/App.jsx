import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
         console.log("API RESPONSE 👉", res.data)
        setNotes(res.data.notes)
      })
      .catch(err => console.error(err))
  }, []) // 👈 empty dependency array

  return (
    <div className="notes">
      {
        notes.map((note, index) => (
          <div className="note" key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
