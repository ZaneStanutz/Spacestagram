import logo from './logo.svg';
import {useState, useEffect} from 'react';
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

function Feed(){
  const [startDate, setStart] = useState("2022-01-01");
  const[endDate, setEnd] = useState("2022-03-01");
  const[data, setData] = useState(null);
  
  function handleSubmit(){
    const handleStartChange = e => {
      setStart(e.target.value)
    };
    const handleEndChange = e => {
      setEnd(e.target.value)
    }
  }
  
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=e8K3ePSnMPazfDhsoTb4hJwJiu3yO3gCIY2zd6cb&start_date=${startDate}&end_date=${endDate}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  },[startDate, endDate]); 
  if(data){
    return(
      <>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Start Year</label>
            <input 
              id='start' 
              type="date" 
              name="start" 
              value={startDate} 
              placeholder="yy-mm-dd" 
              required/>
            <label>End Year</label>
            <input 
              id='end' 
              type="date" 
              name="end"
              value={endDate}
              placeholder="yy-mm-dd" 
              required/>
            <button type='submit'>Find pictures</button>
          </form>
        </div>
        <div className="Feed">
          <h1>{JSON.stringify(data)}</h1>
        </div>
      </>
    )
  }else{
    return(
      <>
        <form onSubmit={handleSubmit}>
            <label>Start Year</label>
            <input 
              id='start' 
              type="date" 
              name="start" 
              value={startDate} 
              placeholder="yy-mm-dd" 
              required/>
            <label>End Year</label>
            <input 
              id='end' 
              type="date" 
              name="end"
              value={endDate}
              placeholder="yy-mm-dd" 
              required/>
            <button type='submit'>Find pictures</button>
        </form>
        <h2>Nasa is down :( </h2>
      </>

    )
  }
}

function App() {
  return (
    <div className="App">
      <Header/>
      <Feed/>
    </div>
  );
}

function AppOverload(start,end) {
  return (
    <div className="App">
      <Header/>
      <Feed start={start} end={end}/>
    </div>
  );
}

export default App;
