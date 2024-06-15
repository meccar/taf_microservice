export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();

    console.log(email, password);
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
