import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
import {Provider as ReduxProvider} from "react-redux"
import { store } from './Redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
    <ReduxProvider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReduxProvider>
   </BrowserRouter>
  </React.StrictMode>
)