import React from 'react'

export default function Hourly(dataProp) {
  const newData = JSON.parse(dataProp.fore);
  const hourly = [];
  const fTemps = [];
  const cTemps = [];
  const f = dataProp.fahren;
  let celMax = 65;
  let celMin = -10;
  let fahrenMax = 130;
  let fahrenMin = -20;
  let fTotal = 100;
  let cTotal = 100;
  const time = [];


  // console.log(dataProp[0])
  for(var i = 0; i < 24; i ++){
    hourly.push(newData[0].hour[i]);
    fTemps.push(hourly[i].temp_f);
    cTemps.push(hourly[i].temp_c);
    let tempTime = hourly[i].time.substring(hourly[i].time.indexOf(' ') + 1,hourly[i].time.length - 3);
    switch(tempTime.substring(0,1)){
      case '0':
        if(tempTime === '00'){
          time.push('12AM');
        }else{
          time.push(tempTime.substring(tempTime.length - 1) + 'AM');
        }
      break;
      case '1':
        if(tempTime === '12'){
          time.push('12PM');
        }else{
          if(tempTime < '12'){
            time.push(tempTime + 'AM');
          }else{
            time.push(tempTime - '12' + 'PM');
          }
        }
      break;
      case '2':
        time.push(tempTime - '12' + 'PM');
      break;
      default:
        console.log("broken switch");
      break;
    }
  }
  console.log(time)
  fahrenMax = Math.max(...fTemps) + 12;
  fahrenMin = Math.min(...fTemps) - 5;
  fTotal = Math.round(fahrenMax + fahrenMin);
  celMax = Math.max(...cTemps) + 12;
  celMin = Math.min(...cTemps) - 2;
  cTotal = Math.round(celMax + celMin);



  return (
    <>
      <div className='forecast-hours'>
        {hourly.map((hour, index) => (
          f === true
          ? <>
            <div className="container">
              <h1 style={{top:`calc(${fTotal - Math.round(hour.temp_f)}% - ${fTotal/2.8}%)`}} key={index}>{Math.round(hour.temp_f)}&deg; </h1>
              <div className="temperature-sliders">
                <input type="range" orient="vertical" data-vertical="true" min={fahrenMin} max={fahrenMax} value={Math.round(hour.temp_f)} oninput="rangeValue.innerText = this.value"/>
              </div>
              <p>{time[index]}</p>
            </div>
            </>
          : <>
            <div className="container">
              <h1 style={{top:`calc(${cTotal - Math.round(hour.temp_c)}% - ${cTotal/10}%)`}} key={index}>{Math.round(hour.temp_c)}&deg; </h1>
              <div className="temperature-sliders">
                <input type="range" orient="vertical" data-vertical="true" min={celMin} max={celMax} value={Math.round(hour.temp_c)} oninput="rangeValue.innerText = this.value"/>
              </div>
              <p style={{top:`1.5em`}}>{time[index]}</p>
            </div>
            </>

        ))}
      </div>
      <div className="slider">
{/* style={{paddingTop:`${hour.temp_f}px`}} */}
          {/* <p id="rangeValue">100</p> */}
        </div>
    </>
// {hour.temp_c}

/*
Make it so that instead of making the value = temp_f, make it
a percentage of the total.
Right now, the temperature displayed are at the right points if it were out of 100, but it isnt

Welp i fixed that immediately, now there is a new problem
Everything works for fahrenheit, but celcius doesnt work properly.
*/
  )
}
