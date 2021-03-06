
import React, {useState, useEffect} from 'react';
import './App.css';
import Heart from 'react-animated-heart';
import Spinner from './Loading'; 

function ClickMe(){
    /* move state up to Form Component*/ 
    const[isclick,setclick] = useState(false);
    return(
      <div className="heart">
        <Heart isClick={isclick} onClick={() => setclick(!isclick)}/>
      </div>
    );
} 

class Feed extends React.Component{
  render(){
  return(
    <div className='card' key={this.props.value}>
      <h2>{this.props.title}</h2>
      <img src={this.props.url}></img>
      <p>{this.props.explanation}</p>
      <ClickMe/>
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

  this.state = {startDate: sevenDaysPriorForm , endDate: curDateForm, data: {goodcolor: 'Blue'}, loading: true };
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
    this.setState({loading: true});
    fetch(`https://api.nasa.gov/planetary/apod?api_key=e8K3ePSnMPazfDhsoTb4hJwJiu3yO3gCIY2zd6cb&start_date=${this.state.startDate}&end_date=${this.state.endDate}`)
      .then(res => res.json())
			.then(data => this.setState({data: data, loading: false}))
      .catch(console.error);
    event.preventDefault();
  }

  render() {
		const response = this.state.data;
		const arr = [];
		Object.keys(response).forEach(function(key){
			arr.push(response[key]);
		});

  return(
    <div>
      <form className='card' onSubmit={this.handleSubmit}>
        <h1>SPACESTAGRAM</h1>
        <label>Start Date</label>
        <input 
          id='start' 
          type="date" 
          name="start" 
          value={this.state.startDate}
          onChange={this.handleStart}
          placeholder="yyyy-mm-dd"
          min="1995-06-16" 
          required/><br></br>
        <label>End Date</label>
        <input 
          id='end' 
          type="date" 
          name="end"
          value={this.state.endDate} 
          onChange={this.handleEnd}
          placeholder="yyyy-mm-dd" 
          max={this.state.endDate}
          required/><br></br>
        <button type='submit'>Find pictures</button>
        {this.state.loading ? <Spinner/> : ""}
      </form>
        {
          arr.map( item => <Feed key={item.date} title={item.title} url={item.url} explanation={item.explanation}/>)
        }
		</div>
    );
  }
	async componentDidMount(){
		const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=e8K3ePSnMPazfDhsoTb4hJwJiu3yO3gCIY2zd6cb&start_date=${this.state.startDate}&end_date=${this.state.endDate}`);
		const data = await response.json();
		this.setState({data: data, loading: false});
	}
}

function App() {
  return ( 
      <div className="App">
        <Form/>
      </div>
  );
}

export default App;
