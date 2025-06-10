import React, { useEffect, useState } from 'react'

const socket = new WebSocket('ws://localhost:8080')

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }
  }, [])

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.send(input)
      setInput('')
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Real-Time Chat</h1>
      <div style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '200px' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginTop: '1rem', padding: '0.5rem', width: '80%' }}
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem' }}>Send</button>
    </div>
  )
}