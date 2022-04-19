import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';

function Header() {
  function logMsg(){
    return(
      console.log("Spacestagram")
    )
  }
return (
    <>
      <h1>SPACESTAGRAM</h1>
    </>
  )
}
function Feed(){}

class Form extends React.Component{
  constructor(props){
  super(props);
  this.state = {startDate: '', endDate: '', data: null };
  this.handleStart = this.handleStart.bind(this);
  this.handleEnd = this.handleEnd.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleStart(event){
    this.setState({startDate: event.target.value});
  }

  handleEnd(event){
    this.setState({endDate: event.target.value});
  }

  handleSubmit(event){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=e8K3ePSnMPazfDhsoTb4hJwJiu3yO3gCIY2zd6cb&start_date=${this.state.startDate}&end_date=${this.state.endDate}`)
      .then(res => this.setState({ data: res.json()}))
      .then(alert(this.props))
      .catch(console.error);
    event.preventDefault();
  }
  render() {
  return(
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>Start Year</label>
        <input 
          id='start' 
          type="date" 
          name="start" 
          value={this.state.startDate}
          onChange={this.handleStart}
          placeholder="yyyy-mm-dd" 
          required/>
        <label>End Year</label>
        <input 
          id='end' 
          type="date" 
          name="end"
          value={this.state.endDate} 
          onChange={this.handleEnd}
          placeholder="yyyy-mm-dd" 
          required/>
        <button type='submit'>Find pictures</button>
        <div>{}
        </div>
      </form>
    </div>
  )
  }
}

function App() {
  return (
    <div className="App">
      <Header/>
      <Form/>
    </div>
  );
}

export default App;
