import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Random = () => Math.floor(Math.random() * anecdotes.length)

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Display = ({ text }) => {
    return (<p style={{ whiteSpace: 'pre' }}>{text}</p>)
}

const handleAnecdote = (text, votes) => {
    return `${text}
has ${votes} votes`
}

const handleVote = (selected, vote, setVote) => {
    const tempArray = [...vote]
    tempArray[selected]++
    setVote(tempArray)
}

const handleMaxVote = (anecdotes, vote) => {
    const maxValue = Math.max(...vote)
    const maxValueIndex = vote.indexOf(maxValue)
    const maxVotedAnecdote = anecdotes[maxValueIndex]

    return `${maxVotedAnecdote}
has ${maxValue} votes`
    }



const App = () => {
    const [selected, setSelected] = useState(Random())
    const [vote, setVote] = useState(new Array(6).fill(0))
    const [selectedAnecdote, currentVotes] = [anecdotes[selected],vote[selected]]

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Display text={handleAnecdote(selectedAnecdote, currentVotes)} />
            <Button text="vote" onClick={() => handleVote(selected, vote, setVote)} />
            <Button text="next anecdote" onClick={() => setSelected(Random())} />
            <h1>Anecdote with most votes</h1>
            <Display text={handleMaxVote(anecdotes, vote)} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App />,
    document.getElementById('root')
)