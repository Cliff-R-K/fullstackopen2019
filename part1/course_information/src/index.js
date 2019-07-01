import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>
    (
        <h1>{props.course}</h1>
    )

const Content = (props) => {
    console.log('Content: ' + props.parts)
    return (
        <>
            <Part parts={props.parts[0]} />
            <Part parts={props.parts[1]} />
            <Part parts={props.parts[2]} />
        </>
    )
}

const Part = (props) => {
    console.log('Part: ' + props)

    return (
        <p>{props.parts.name} {props.parts.exercises}</p>
    )
}

const Total = (props) => {

    const total = props.parts.map(x => x.exercises).reduce((total, currentValue) => {
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