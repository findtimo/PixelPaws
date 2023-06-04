import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {

  const [accounts, setAccounts] = useState([]);

  return (
    <ChakraProvider>
    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <Home accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="bg-wrap">
        <div className="bg bg1"/>
        <div className="bg bg2"/>
        <div className="bg bg3"/>
        <div className="bg bg4"/>
        <div className="bg bg5"/>
      </div>
    </div>

    </ChakraProvider>
  )
}

export default App
