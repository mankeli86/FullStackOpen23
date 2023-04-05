const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

const Header = (props) => {
  return [
    <h1>{props.course}</h1>
  ]
}

const Content = (props) => {
  return (
    props.parts.map(prop => <Part part={prop.name} exercises={prop.exercises}/>)
    )
}

const Total = (props) => {
  let ex = props.parts.map(value => value.exercises);
  return [
    <p>Number of exercises {ex.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )}
    </p>
  ]
}

const Part = (props) => {
  return [
    <p>{props.part} {props.exercises}</p>
  ]
}

export default App
