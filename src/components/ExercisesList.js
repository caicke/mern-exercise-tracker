import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  const Exercise = (props) => {
    const { _id, username, description, duration, date } = props.exercise;

    return (
      <tr>
        <td>{username}</td>
        <td>{description}</td>
        <td>{duration}</td>
        <td>{date.substring(0, 10)}</td>
        <td>
          <Link to={"/edit/" + _id}>
            <button className="btn btn-outline-primary mr-2">
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteExercise(_id);
            }}
          >
            <FontAwesomeIcon className="mr-1" icon={faTrash} />
            Delete
          </button>
        </td>
      </tr>
    );
  };

  const deleteExercise = async (id) => {
    try {
      await axios.delete("http://localhost:5000/exercises/delete/" + id);
      setExercises(exercises.filter((el) => el._id !== id));
      alert("Exercise deleted.");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get("http://localhost:5000/exercises");
      setExercises(response.data);
    };
    fetchExercises();
  }, []);

  return (
    <div className="container">
      <h1>Exercises List page</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return <Exercise key={exercise._id} exercise={exercise} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
