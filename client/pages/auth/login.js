import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/v1/user/login",
    body: {
      email,
      password,
    },

    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
      {errors}
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};
