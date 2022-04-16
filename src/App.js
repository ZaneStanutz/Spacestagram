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
function Form(){
  const [start, setStart] = useState("");
  const[end, setEnd] = useState("");
  const handleStartChange = e => {
    setStart(e.target.value)
  };
  const handleEndChange = e => {
    setEnd(e.target.value)
  }

  function handleSubmit(){
    alert(`this is start : ${start}/n this is end : ${end}`); 
  }
  return(
    <form onSubmit={handleSubmit}>
          <label>Start Year</label>
          <input 
            id='start' 
            type="date" 
            name="start" 
            onChange={handleStartChange} 
            value={start} 
            placeholder="yy-mm-dd" 
            required/>
          <label>End Year</label>
          <input 
            id='end' 
            type="date" 
            name="end"
            onChange={handleEndChange}
            value={end}
            placeholder="yy-mm-dd" 
            required/>
          <button type='submit'>Find pictures</button>
      </form>
  )
}
function Feed(){
  const[data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=e8K3ePSnMPazfDhsoTb4hJwJiu3yO3gCIY2zd6cb`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  },[]); 
  if(data){
    return(
      <>
        <div className="Feed">
          <img className="FeedImg"src={data.hdurl}></img>
          <h3>{data.title}</h3><p>{data.date}</p>
          <p>{data.explanation}</p>
        </div>
      </>
    )
  }
}


function App() {
  return (
    <div className="App">
      <Header/>
      <Form/>
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
