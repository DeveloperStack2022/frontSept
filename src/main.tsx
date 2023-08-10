import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '@/store'
import {ApolloClient,createHttpLink,InMemoryCache,ApolloProvider,} from '@apollo/client'


const link = createHttpLink({
  uri:'http://localhost:5050/graphql'
})

const client = new ApolloClient({
  cache: new InMemoryCache({addTypename:false}),
  link:link
})



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <ApolloProvider client={client}>   
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
)
