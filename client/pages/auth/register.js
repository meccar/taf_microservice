import { useState } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("/api/v1/user/register", {
      email,
      password,
    });

    console.log(response.data);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>
      <div className="form-group">
        <label>Email Address: </label>
        <input
          value={email}
          onchange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>password: </label>
        <input
          value={password}
          onchange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Register</button>
    </form>
  );
};
