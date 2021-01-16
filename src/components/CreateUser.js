import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const submitUser = async (e) => {
    try {
      e.preventDefault();
      const user = { username: username };
      await axios.post("http://localhost:5000/users/add", user);

      alert("User created successfully");
      console.log(user);
      setUsername("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h3>Create New User</h3>

      <form onSubmit={submitUser}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
