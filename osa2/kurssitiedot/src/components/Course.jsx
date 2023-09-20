const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return [
   <h1 key={props.course.id}>{props.course.name}</h1>
 ]
}
  
const Content = (props) => {
  return (
    props.parts.map(prop => <Part key={prop.id} part={prop.name} exercises={prop.exercises}/>)
  )
}

const Part = (props) => {
  return (
    <p key={props.id}>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  let ex = props.parts.map(value => value.exercises);
  return [
    <p key={"total"}>total of {ex.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )} exercises
    </p>
  ]
}

export default Course