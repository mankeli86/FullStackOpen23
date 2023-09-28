import { useEffect, useState } from 'react'
import contactService from './contactService'

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with<input value={search} onChange={handleSearch}/>
    </div>
  )
}

const PersonForm = ({ name, number, handleName, handleNumber, addNumber }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={name} onChange={handleName}/>
      </div>
      <div>
        number: <input value={number} onChange={handleNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deleteNumber }) => {
  return (
    persons.map(person => <div key={person.name}>{person.name} {person.number} 
    <button onClick={() => deleteNumber(person.id, person.name)}>delete</button></div>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [filteredNames, setFilteredNames] = useState(persons)

  useEffect(() => {
    contactService
      .getAll()
        .then(p => {
        setPersons(p)
        setFilteredNames(p)
      })
  }, [])
  
  const deleteFromPhonebook = (id, name) => {
    const deleting = window.confirm(`Delete ${name} ?`)
    if (deleting) {
      contactService
        .deleteContact(id)
          .then(() => {
            contactService
              .getAll()
                .then(p => {
                  setPersons(p)
                  setFilteredNames(p)
                })
          })
    }
  }
  
  const addToPhonebook = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.includes(persons.find(p=>p.name==newName))) {
      const replace = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        contactService
          .update((persons.findIndex(p => p.name==newName)+1), nameObject)
            .then(() => {
              contactService
                .getAll()
                  .then(p => {
                    setPersons(p)
                    setFilteredNames(p)
                  })
            })
      }
    }
    else {
      contactService
        .create(nameObject)
          .then(returnedNames => {
          setPersons(persons.concat(returnedNames))
          setFilteredNames(persons.concat(returnedNames))
          })
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
      <Filter search={nameSearch} handleSearch={handleSearchChange}/>
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleNameChange} 
        handleNumber={handleNumberChange} addNumber={addToPhonebook}/>
      <h2>Numbers</h2>
      <Persons persons={filteredNames} deleteNumber={deleteFromPhonebook}/>
    </div>
  )

}

export default App
