import logo from './logo.svg';
// import './App.css';
import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import MenuComponent  from './components/MenuComponent';
import HomeComponent from './components/HomeComponent';
import RegisterComponent from './components/RegisterComponent';

import { Redirect } from 'react-router';


// Context
export const AuthContext = createContext()

//Inisiasi state
const initialState = {

  results: null,
}


const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
     
      localStorage.setItem("token", JSON.stringify(action.payload.results))
      return {
        ...state,
        isAuthenticated: true,
       
        results: action.payload.results,

      }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
       
      }
    
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
  <BrowserRouter>
    <Switch >
    <AuthContext.Provider value={{
          state,
          dispatch
      }}>
        <MenuComponent/>
        {!state.isAuthenticated ?
          <Redirect to={{
            pathname: "/"
          }}/> :
          <Redirect to={{
            pathname: "/homepage"
          }} />
       }

       <Route exact path="/" component={LoginComponent}/>
       <Route exact path="/homepage" component={HomeComponent}/>
       <Route exact path="/register" component={RegisterComponent}/>
      </AuthContext.Provider>
    </Switch>
  
  </BrowserRouter>
  );
}

export default App;
