async function fetchTShirtData(text,variables) {
  // Fetch data from Play2 GraphQL server:
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables
    }),
  });
  // Get the response as JSON
  return await response.json();
}

export default fetchTShirtData;