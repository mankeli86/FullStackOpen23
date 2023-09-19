import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const DisplayGood = props => <div>Good {props.good}</div>
const DisplayNeutral = props => <div>Neutral {props.neutral}</div>
const DisplayBad = props => <div>Bad {props.bad}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (feedback) => () => {
    if (feedback == 'good') {
      setGood(good+1)
      console.log('good', good+1)
    } else if (feedback == 'neutral') {
      setNeutral(neutral+1)
      console.log('neutral', neutral+1)
    } else if (feedback == 'bad') {
      setBad(bad+1)
      console.log('bad', bad+1)
    }
  }

  const total = good+neutral+bad
  const average = (good*1+neutral*0+bad*-1)/total
  const positive = good/total

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToValue('good')} text="good" />
      <Button handleClick={setToValue('neutral')} text="neutral" />
      <Button handleClick={setToValue('bad')} text="bad" />
      <h1>statistics</h1>
      <DisplayGood good={good}/>
      <DisplayNeutral neutral={neutral}/>
      <DisplayBad bad={bad}/>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  )
}



export default App
