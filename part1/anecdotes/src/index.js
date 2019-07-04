import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Random = () => Math.floor(Math.random() * anecdotes.length)

const DisplayAnecdote = ({ anecdote }) => {
    return <p>{anecdote}</p>
}

const DisplayVote = ({ votes, selected}) => {
   
    return (<p>has {votes[selected]} votes</p>)
}

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const handleVote = (selected, vote, setVote) => {
    const tempArray = [...vote]
    tempArray[selected]++
    setVote(tempArray)
}

const App = (props) => {
    const [selected, setSelected] = useState(Random())
    const [vote, setVote] = useState(new Array(6).fill(0))
    
    return (
        <div>
            <DisplayAnecdote anecdote={anecdotes[selected]} />
            <Button text="vote" onClick={() => handleVote(selected, vote, setVote)}/>
            <Button text="next anecdote" onClick={() => setSelected(Random())} />
            <DisplayVote votes={vote} selected={selected} />
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
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)