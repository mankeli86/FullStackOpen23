import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    )
  }
}

const Statistics = (props) => {
  const {good, neutral, bad} = props.feedback
  if (good+neutral+bad == 0) {
    return [
      <div>No feedback given</div>
    ]
  }
  else {
    return (
      <table>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value={good+neutral+bad}/>
        <StatisticLine text="average" value ={(good*1+neutral*0+bad*-1)/(good+neutral+bad)} />
        <StatisticLine text="positive" value={good/(good+neutral+bad)}/>
      </table>
    )
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
