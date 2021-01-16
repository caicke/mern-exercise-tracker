import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditExercise = () => {
  const [usernames, setUsernames] = useState([]);
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsernames(response.data);
    };

    fetchUsers();
  }, []);

  const submitEdit = async (e) => {
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    try {
      e.preventDefault();

      await axios.post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      );
      console.log(exercise);

      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Edit Exercise</h1>
      <form onSubmit={submitEdit}>
        <div className="form-group mt-5">
          <label className="form-label">Select Username</label>
          <select
            className="form-control"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Choose an user...
            </option>
            {usernames.map((user) => {
              return (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
          <Link to="/user">
            <p>Create new user</p>
          </Link>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              type="text"
              placeholder="Description of the exercise..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Duration</label>
            <input
              className="form-control"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label mr-3">Date: </label>
            <DatePicker selected={date} onChange={(e) => setDate(e)} />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Exercise"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
