import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Display = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}
const History = ({ hasRating }) => {
  if (!hasRating) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (<h1>statistics</h1>)
}

const Statistics = ({ text, value, hasRating }) => {
  if (hasRating) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  return null
}

const average = (good, bad, total) => {
  return ((good - bad) / total)
}

const positive = (good, total) => {
  return ((good / total) * 100 + " %")
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalRatings = good + neutral + bad
  const hasRatings = totalRatings > 0

  return (
    <div>
      <Display text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <History hasRating={hasRatings} />
      <table>
        <tbody>
          <Statistics text="good" value={good} hasRating={hasRatings} />
          <Statistics text="neutral" value={neutral} hasRating={hasRatings} />
          <Statistics text="bad" value={bad} hasRating={hasRatings} />
          <Statistics text="all" value={totalRatings} hasRating={hasRatings} />
          <Statistics text="average" value={average(good, bad, totalRatings)} hasRating={hasRatings} />
          <Statistics text="positive" value={positive(good, totalRatings)} hasRating={hasRatings} />
        </tbody>
      </table>
    </div>

  )
}
ReactDOM.render(<App />, document.getElementById('root')
)