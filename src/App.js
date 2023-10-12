import {useState, useEffect} from 'react'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import { getK } from './firebase'
import Hourly from './components/Hourly';

// let name = ''
// let temperatureF = ''
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function App() {
  const [fahrenheit, setF] = useState(true);

  const [location, setLoc] = useState('');//name
  const [tempLoc, setTempLoc] = useState('')//temporary name
  const [tempF, setTempF] = useState('');
  const [tempC, setTempC] = useState('');
  const [feelsF, setFeelsF] = useState('');
  const [feelsC, setFeelsC] = useState('');
  // const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [forecast, setForecast] = useState([]);
  // const [tempF, setTempF] = useState('');






  //default location from ip
  useEffect(()=> {
    const fetchData = async () => {
      // let temp = 'AM';
      const aK = await getK();
      const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${aK}&q=auto:ip&days=7&aqi=yes&alerts=yes`)
      result.json().then(data =>{
      setLoc(data.location.name);
      setRegion(data.location.region);
      setTempF(data.current.temp_f);
      setTempC(data.current.temp_c);
      setFeelsF(data.current.feelslike_f);
      setFeelsC(data.current.feelslike_c);
      let newTime = data.location.localtime;
      setTime(newTime.substring(newTime.indexOf(' ') + 1))
      calcDate(newTime.substring(0, newTime.indexOf(' ')));
      setForecast(data.forecast.forecastday);
      console.log(data)


        // setTime(data.location.localtime)
        // console.log(data.forecast.forecastday[0].hour);
      })
    }
    fetchData();
  }, [])

  //update location yourself
  async function formSubmit(e){
    e.preventDefault();
    // document.getElementById("ent-loc").value = " ";
    const aK = await getK();
    const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${aK}&q=${tempLoc}&days=7&aqi=yes&alerts=yes`)
    result.json().then(data =>{
      setLoc(data.location.name);
      setRegion(data.location.region);
      setTempF(data.current.temp_f);
      setTempC(data.current.temp_c);
      setFeelsF(data.current.feelslike_f);
      setFeelsC(data.current.feelslike_c);
      let newTime = data.location.localtime;
      setTime(newTime.substring(newTime.indexOf(' ') + 1))
      calcDate(newTime.substring(0, newTime.indexOf(' ')));
      setForecast(data.forecast.forecastday);
      console.log(data);

      //clear the text field after entering
      setTempLoc("");
        // console.log("blah blah " + forecast[5].value)

    })
  }

  function calcDate(newDate){
    let day = newDate.substring(newDate.indexOf('-') + 4)
    if(day.charAt(0) === '0'){
      day = day.replace(day.charAt(0), "");
    }
    let month = months[(newDate.substring(newDate.indexOf('-') + 1,7)) - 1];

    setDate(month.concat(" ", day, ","));
  }

  return (
    <>
      <div className="temp">
        <div className="top-bar">
          <form onSubmit={formSubmit}>
            <input type="text" value={tempLoc} onChange={(e)=> setTempLoc(e.target.value)} name="" placeholder='Enter Location'/>
            <input type="submit"/>
          </form>
          <button onClick={() => setF(!fahrenheit)}>F/C</button>
        </div>
        <h1 style={{marginBottom:`0em`, marginTop:`0em`}}>{location} <span className='tSpan'>{region}</span></h1>
        <h1 style={{fontSize:`.9em`, margin:`0em`}}>{date} {time}</h1>
        { fahrenheit && <h1>{tempF}&deg; F <span className='tSpan'>Feels like {feelsF}&deg; F</span></h1> }
        { !fahrenheit && <h1>{tempC}&deg; C <span className='tSpan'>Feels like {feelsC}&deg; C</span></h1> }
        {/* <ul>
          {forecast.map(fore => (
            <li key={fore.id}>{fore.value}</li>
            // <li key={forecast.id}>{forecast.value_c}</li>
          ))}
        </ul> */}
      </div>
      {forecast.length > 0 && <Hourly fore={JSON.stringify(forecast)} fahren={fahrenheit}></Hourly>}
    </>
  )
}

export default App;
