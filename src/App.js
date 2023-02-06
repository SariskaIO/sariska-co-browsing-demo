import React, { useEffect, useState } from 'react';
import {Switch,Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import colly from './img/COLLY_full_svg.svg';
//import {coBrowsing} from 'sariska-cobrowsing';
import { POP_UP, SUCCESS_MESSAGE } from './constants';

function App() {
  const [buttonText, setButtonText] = useState(POP_UP.LOGO);
  const [state, setState] = useState({
    //username: localStorage.getItem('username') || '',
    //session: localStorage.getItem('session') || '',
    username: '',
    session: '',
    divider: false,
    status: false
  })
  let textToBeCopied = window.location.href;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState(state => ({...state, [name]: value}));
  }

  const handleCoBrowsing = () => {
    if(buttonText === POP_UP.LOGO) {
      setButtonText(POP_UP.CLOSE);
      setState(state => ({...state, divider: true}));
    }
    if(buttonText === POP_UP.GO){
      //localStorage.setItem('username', state.username);
      setButtonText(POP_UP.CLOSE);
      setState(state => ({...state, divider: false}));
    }
    if(buttonText === POP_UP.SEND){
      //localStorage.setItem('session', state.session);
      setButtonText(POP_UP.COPY);
      //coBrowsing.startCoBrowsing(state.username, state.session);
    }
    if(buttonText === POP_UP.CLOSE  ) {
      //coBrowsing.stopCoBrowsing();
      setButtonText(POP_UP.LOGO);
      setState(state => ({...state, username: '', session: '', divider: false, status: false}));
    }
    if(buttonText === POP_UP.COPY){
      navigator.clipboard.writeText(textToBeCopied);
      setButtonText(POP_UP.DONE);
      setState(state => ({...state, status: true}));
      setTimeout(()=>setButtonText(POP_UP.CLOSE), 3000);
    }
  }

  useEffect(()=>{
    if(state.username){
      setButtonText(POP_UP.GO);
    }
    if(state.session){
      setButtonText(POP_UP.SEND);
    }
  },[state.session, state.username])

  console.log('hanlde', state, buttonText, buttonText === POP_UP.GO);
  return (
    <React.Fragment>
      <Navbar />
                <div className={'co-browsing'}>
                    <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                           <button 
                            onClick={handleCoBrowsing}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              fontSize: '36px',
                            }}
                            >
                            {
                              buttonText === POP_UP.LOGO ? 
                              <img src={colly} alt='logo' height="34px" />
                              :
                              buttonText === POP_UP.CLOSE ? 
                              <span style={{color: '#0a00a6'}} className="material-symbols-outlined">
                                close
                              </span>
                              :
                              buttonText === POP_UP.GO ?
                              <span style={{color: '#0a00a6'}} className="material-symbols-outlined">
                                navigate_next
                              </span>
                              :
                              buttonText === POP_UP.SEND ?
                              <span style={{color: '#0a00a6'}} className="material-symbols-outlined">
                              send
                              </span>
                              : 
                              buttonText === POP_UP.COPY ?
                              <span style={{color: '#0a00a6'}} className="material-symbols-outlined">
                              content_copy
                              </span>
                              :
                              buttonText === POP_UP.DONE ?
                              <span style={{color: '#0a00a6'}} className="material-symbols-outlined">
                              done_all
                              </span>
                              :
                              null
                            }
                           </button>
                    </div>
                    <div style={{
                      top: '9px',
                      position: 'absolute',
                      left: '-186px',
                      zIndex: 9999
                    }}>
                      {
                        [POP_UP.CLOSE, POP_UP.GO, POP_UP.SEND].includes(buttonText) ? 
                          state.status ? 
                          <input 
                            value={textToBeCopied}
                            disabled
                          /> 
                          :
                          <input 
                              name={ state.divider ? 'username' : 'session'}
                              value={state.divider ? state.username : state.session }
                              placeholder={state.divider ? 'Enter your username' : 'Enter session name'}
                              onChange={handleChange}
                          /> 
                        :
                        buttonText === POP_UP.COPY ?
                        <input 
                          value={textToBeCopied}
                          disabled
                        /> 
                        :
                        buttonText === POP_UP.DONE ?
                        <input 
                          value={SUCCESS_MESSAGE}
                          disabled
                        /> 
                        :
                        null 
                      }
                    </div>
                </div>
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </React.Fragment>
  );
}

export default App;
