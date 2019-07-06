import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) =>
    (
        <h1>{course}</h1>
    )

const Content = ({parts}) => {
    return (
        <>
            <Part parts={parts[0]} />
            <Part parts={parts[1]} />
            <Part parts={parts[2]} />
        </>
    )
}

const Part = ({parts}) => {
    return (
        <p>{parts.name} {parts.exercises}</p>
    )
}

const Total = ({parts}) => {

    const total = parts.map(p => p.exercises).reduce((total, currentValue) => {
        return total + currentValue;
    })

    return (
        <p>Number of excercises {total}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },

            {
                name: 'Using props to pass data',
                exercises: 7
            },

            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))