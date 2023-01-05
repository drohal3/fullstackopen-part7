import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from "react-router-dom"

import { useField } from './components/Field'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {


  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={ `/anecdotes/${anecdote.id}` }> { anecdote.content } </Link></li>)}
    </ul>
  </div>
)}

const Anecdote = ({ anecdote }) => (
  <div>
    <p> { anecdote.content } </p>
    <p> has { anecdote.votes } votes</p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContentField, ...contentField } = useField('text')
  const { reset: resetAuthorField, ...authorField } = useField('text')
  const { reset: resetInfoField, ...infoField } = useField('text')

  const newAnecdote = (e, content, author, info) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  const resetFields = (e) => {
    e.preventDefault()
    resetContentField()
    resetAuthorField()
    resetInfoField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button onClick={ (e) => newAnecdote(e, contentField.value,authorField.value, infoField.value) }>create</button>
        <button onClick={ (e) => resetFields(e) }>reset</button>
      </form>
    </div>
  )

}

const Notification = ( { notification } ) => (
  <p> { notification } </p>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const navigate = useNavigate()

  const [notification, setNotification] = useState('')

  const timeNotification = (notification, seconds) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification('')
    }, seconds * 1000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    timeNotification(`Added "${anecdote.content}".`, 5)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={ notification } />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
