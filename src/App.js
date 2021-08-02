import React from 'react'
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {  RelayEnvironmentProvider,  loadQuery,  usePreloadedQuery,} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import {
  Anchor,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Paragraph
} from 'grommet';

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

const getColor = (color) => {
  switch(color){
    case 'red':
      return 'status-critical' 
    case 'yellow':
      return 'accent-4'
    case  'blue':
      return 'neutral-3'
    default:
    console.log(`Sorry, we are out of ${color}.`); 
  }
}

function App(props) {
  const data = usePreloadedQuery(TshirtDetailsQuery, props.preloadedQuery);
    console.log("data", data)
    return (
      <> 
        <Box pad="small" align="start">    
          <Heading level={4} alignSelf="center">T-shirt Store example using scala and GraphQL</Heading>
        </Box>     
        <div className="App">             
        {data && data.tshirts && data.tshirts.map((tshirt) => 
          <Card elevation="large" width="medium" key={tshirt._id}>
              <CardBody height="small">
                  <Image
                    fit="cover"
                    src={tshirt.pic_url}
                    a11yTitle="bridge"
                  />
              </CardBody>
            <CardFooter>
                    <Anchor
                      href="#"
                      label="Add to cart"
                    />
                    <Box background={getColor(tshirt.color)} border={{ color: getColor(tshirt.color), size: 'large' }}responsive={false}>
                    </Box>
                    <Paragraph>
                        Price: {tshirt.price}
                    </Paragraph>
              </CardFooter>
          </Card>
        )}    
      </div> 
     </>  
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
