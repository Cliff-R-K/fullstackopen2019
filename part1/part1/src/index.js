import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => { 
   const name = "Cliff"
   const age = 38

 return (
 <>
     <h1>Greetings</h1>
     <Hello name={name} age={age}/>
     <Hello name="Leon" age={10+30}/>
</>
 )
}

ReactDOM.render( <App /> , document.getElementById('root'))