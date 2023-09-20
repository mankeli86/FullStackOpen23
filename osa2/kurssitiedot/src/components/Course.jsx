const Course = ({ course }) => {
    console.log(course)
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
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

export default Course