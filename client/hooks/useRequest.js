import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequeset = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded text-red-700">
          <h4 className="font-bold mb-2">Ooops...</h4>
          <ul className="list-disc list-inside">
            {err.response.data.errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>,
      );
    }
  };

  return { doRequeset, errors };
};
