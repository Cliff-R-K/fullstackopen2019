import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => 
  (
    <button onClick={onClick}>{text}</button>
  )


const Statistics = ({ text, value }) => 
  (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )



const average = (good, bad, total) => {
  return ((good - bad) / total)
}

const positive = (good, total) => {
  return ((good / total) * 100)
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
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      {hasRatings ? (
        <table>
          <tbody>
            <Statistics text="good" value={good} />
            <Statistics text="neutral" value={neutral} />
            <Statistics text="bad" value={bad} />
            <Statistics text="all" value={totalRatings} />
            <Statistics text="average" value={average(good, bad, totalRatings)} />
            <Statistics text="positive" value={positive(good, totalRatings) + " %"} />
          </tbody>
        </table>
      ) : <p>No feedback</p>
      }
    </div>

  )
}
ReactDOM.render(<App />, document.getElementById('root')
)