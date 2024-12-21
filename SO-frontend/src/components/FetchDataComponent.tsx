import React, { useEffect, useState } from 'react';

function FetchDataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API URL
    const apiUrl = 'http://localhost:8000/';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Assuming the response is JSON
      })
      .then(data => setData(data))
      .catch(err => setError(err.message));
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Fetch Data Example</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchDataComponent;
