import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [most, setMost] = useState(0)
  const random = () => Math.floor(Math.random()*anecdotes.length)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const copy = [...votes]

  const setToSelected = randInt => {
    console.log(randInt)
    setSelected(randInt)
  }

  const addVote = anecdote => {
    copy[anecdote] +=1
    setVotes(copy)
  }
  
  const setToMost = (arr) => {
    setMost(mostVotesIndex(arr))
  } 
  
  const mostVotesIndex = (arr) => {
    return arr.reduce((maxIndex, elem, i, arr) => 
      elem > arr[maxIndex] ? i : maxIndex, 0)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        has {copy[selected]} votes
      </div>
      <div>
        <Button handleClick={() => {addVote(selected), setToMost(copy)}} text="vote"/>
        <Button handleClick={() => setToSelected(random())} text="next anecdote"/>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[most]}</div>
      <div>has {copy[most]} votes</div>
    </div>
  )
}

export default App
