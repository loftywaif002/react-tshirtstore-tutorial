import React from 'react'
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {  RelayEnvironmentProvider,  loadQuery,  usePreloadedQuery,} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

const { Suspense } = React;

// Define a query
const TshirtDetailsQuery = graphql`
query AppQuery{
   tshirts{
     _id
     color
     pic_url
     price
   }
 }
`;


const preloadedQuery = loadQuery(RelayEnvironment, TshirtDetailsQuery, {  /* query variables */});

function App(props) {
  const data = usePreloadedQuery(TshirtDetailsQuery, props.preloadedQuery);
    console.log("data", data)
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

function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
         <Suspense fallback={'Loading...'}>        
           <App preloadedQuery={preloadedQuery} />      
         </Suspense>
    </RelayEnvironmentProvider>
  );
}
export default AppRoot;
