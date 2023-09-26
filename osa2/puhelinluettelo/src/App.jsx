import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [filteredNames, setFilteredNames] = useState(persons)

  const addToPhonebook = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.includes(persons.find(p=>p.name==newName))) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNameSearch(event.target.value.toLowerCase())
    var updatedNames = [...persons]
    updatedNames = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredNames(updatedNames)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={nameSearch} onChange={handleSearchChange}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addToPhonebook}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>debug: {newName} {newNumber}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredNames.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )

}

export default App
