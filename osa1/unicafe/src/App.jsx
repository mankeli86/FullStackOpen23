import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const {good, neutral, bad} = props.feedback
  if (good+neutral+bad == 0) {
    return [
      <div>No feedback given</div>
    ]
  }
  else {
    return [
      <div>Good {good}</div>,
      <div>Neutral {neutral}</div>,
      <div>Bad {bad}</div>,
      <div>all {good+neutral+bad}</div>,
      <div>average {(good*1+neutral*0+bad*-1)/(good+neutral+bad)}</div>,
      <div>positive {good/(good+neutral+bad)} %</div>
    ]
  }
}

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

  const feedback = {good, neutral, bad}

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToValue('good')} text="good" />
      <Button handleClick={setToValue('neutral')} text="neutral" />
      <Button handleClick={setToValue('bad')} text="bad" />
      <h1>statistics</h1>
      <Statistics feedback={feedback}/>
    </div>
  )
}



export default App
