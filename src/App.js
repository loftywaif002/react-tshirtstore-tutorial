import React, {useState, useEffect} from 'react'
import './App.css';
import fetchTShirtData from './fetchGraphQL';

function App() {
  const [tshirts, setTshirts] = useState(null);
  // When the component mounts we'll fetch data
  useEffect(() => {
    let isMounted = true;
    fetchTShirtData(`
       query{
          tshirts{
            id
            color
            pic_url
            price
          }
        }
      `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      console.log('data', data)
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, [fetchTShirtData]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
