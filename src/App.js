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
class Feed extends React.Component{
  render(){
  return(
    <div>
      <h1>{this.props.title}</h1>
			<h3>{this.props.date}</h3>
      <img src={this.props.url}></img>
      <p>{this.props.explanation}</p>
    </div>
  )
  }
}

class Form extends React.Component{
  constructor(props){
  super(props);

	const curDate = new Date();
	const offset = curDate.getTimezoneOffset();
	const todayGeoParam = new Date(curDate.getTime() - (offset*60*1000));
	const curDateForm = todayGeoParam.toISOString().split('T')[0];

	var sevenDaysPrior = new Date(new Date().setDate(new Date().getDate() - 7));
	const sevenDaysPriorForm = sevenDaysPrior.toISOString().split('T')[0];

  this.state = {startDate: sevenDaysPriorForm , endDate: curDateForm, data: {goodcolor: 'Blue'} };
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
      .then(res => res.json())
			.then(data => this.setState({data: data}))
      .catch(console.error);
    event.preventDefault();
		
  }
  render() {
		/* +TODO hanle error  (Date must be between  jun 16 1995 and today)*/
		const response = this.state.data;
		const arr = [];
		Object.keys(response).forEach(function(key){
			arr.push(response[key]);
		});
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
          required/><br></br>
        <label>End Year</label>
        <input 
          id='end' 
          type="date" 
          name="end"
          value={this.state.endDate} 
          onChange={this.handleEnd}
          placeholder="yyyy-mm-dd" 
          required/><br></br>
        <button type='submit'>Find pictures</button>
       
    	</form>
				{
					arr.map( item => <Feed key={item.date} date={item.date} title={item.title} url={item.url} explanation={item.explanation} />)
				}
		</div>
  )
  }
	async componentDidMount(){
		const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=e8K3ePSnMPazfDhsoTb4hJwJiu3yO3gCIY2zd6cb&start_date=${this.state.startDate}&end_date=${this.state.endDate}`);
		const data = await response.json();
		this.setState({data: data});
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
