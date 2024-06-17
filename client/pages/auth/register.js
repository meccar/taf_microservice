import { useState } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/register", {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setErrors(
        err.response?.data?.errors || [{ message: "An error occurred" }],
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Email Address: </label>
        <input
          value={email}
          onchange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">password: </label>
        <input
          value={password}
          onchange={(e) => setPassword(e.target.value)}
          type="password"
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded text-red-700">
          <h4 className="font-bold mb-2">Ooops...</h4>
          <ul className="list-disc list-inside">
            {errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};
