import React,{useState} from "react";

import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'

function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [entererdAge, setEnteredAge] = useState('')
  const [error,setError] = useState()

  const addUserHandler = (event) => {
    event.preventDefault();
    if(enteredUsername.trim().length === 0 || entererdAge.trim().length === 0){
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age'
      });
      return
    }
    if(+entererdAge < 1 ){
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age'
      });
      return;
    }
    props.onAddUser(enteredUsername,entererdAge)
    setEnteredUsername('')
    setEnteredAge('')
  };

  const usernameChangeHandler = (event) =>{
    setEnteredUsername(event.target.value)
  }

  const ageChangeHandler = (event) =>{
    setEnteredAge(event.target.value)
  }

  const errorHandler = () =>{
    setError(null)
  }

  return (
    <div>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input value={enteredUsername} id="username" type="text" onChange={usernameChangeHandler}/>
        <label htmlFor="age">Age</label>
        <input value={entererdAge} id="age" type="number" onChange={ageChangeHandler}/>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  );
}

export default AddUser;
