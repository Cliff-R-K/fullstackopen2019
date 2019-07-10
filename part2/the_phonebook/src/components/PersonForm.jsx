import React from 'react'

const PersonForm = ({addPerson, newName, nameHandler,newNumber, numberHandler }) => 

<form onSubmit={addPerson}>
name: <input
  value={newName}
  onChange={nameHandler}
/><br/>
number: <input
  value={newNumber}
  onChange={numberHandler}
/><br/>
<button type="submit">add</button>
</form>


export default PersonForm