async function fetchTShirtData(query) {
  // Fetch data from Play2 GraphQL server:
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchTShirtData;