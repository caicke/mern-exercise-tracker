import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <br />
        <Route path="/" exact component={ExercisesList}></Route>
        <Route path="/edit/:id" component={EditExercise}></Route>
        <Route path="/create" component={CreateExercise}></Route>
        <Route path="/user" component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
