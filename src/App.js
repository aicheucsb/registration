import logo from './logo.svg';
import './App.css';
import { ValidateTime, ValidateDate } from './lib/validation';
import { MakeReservation } from './lib/calendar';
import { ReactEmbeddedGoogleCalendar } from 'react-embedded-google-calendar';

function App() {

  let label=['Project name', 'Purpose','Contact person', 'Email'];
  let labelfix = label.map(name => name.replace(' ',''));

  let labels = []; //https://stackoverflow.com/questions/2383484/how-to-create-a-dynamic-object-in-a-loop
  for (var i = 0; i < label.length; i++) {
    labels.push({label:label[i], labelfix:labelfix[i]});
  }

  function getInputs(e) {
    e.preventDefault();
    let inputs = {};
    labelfix.forEach(id => {
      inputs[id] = document.getElementById(id).value;
    })
    inputs["Day"] = document.getElementById("Day").value;
    inputs["Starttime"] = document.getElementById("Starttime").value;
    inputs["Endtime"] = document.getElementById("Endtime").value;
    const TIME_VALID = ValidateTime(inputs["Starttime"], inputs["Endtime"]);
    const DATE_VALID = ValidateDate(inputs["Day"]);
    if (TIME_VALID && DATE_VALID) {
      // Valid data, so make reservation
      MakeReservation(inputs).then((result) => {
        console.log(result);
      });
    } else if (!TIME_VALID && !DATE_VALID) {
      console.log("Both invalid day and invalid time");
    } else if (!TIME_VALID) {
      console.log("Invalid start and end time");
    } else if (!DATE_VALID) {
      // Invalid
      console.log("Invalid day");
    }
    console.log(inputs);
  }

  return (
    <div className="App">
      <div id="reservations">
        
        <form id="reserve" onSubmit={getInputs}> 
          {labels.map((labels) => { //https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs
            return <label for={labels.labelfix}> {labels.label}
              <input id={labels.labelfix} name={labels.labelfix}/>
            </label>
          })}
          <label title="mm/dd/yyyy">Day 
            <input type="date" id="Day" name="Day"/>
          </label>
          <label title="format: hh:mm AM/PM">Start time
            <input type="time" id="Starttime" name="Starttime"/>
          </label>
          <label title="format: hh:mm AM/PM">End time 
            <input type="time" id="Endtime" name="Endtime"/>
          </label>

          <input type="submit" id="submitb" value="Submit!" />
        </form>
        <ReactEmbeddedGoogleCalendar publicUrl = "https://calendar.google.com/calendar/embed?src=cscae19m9abei8bv23e1queim8%40group.calendar.google.com&ctz=America%2FLos_Angeles" height="500px"/>
      </div>
    </div>
  );

  
}

export default App;
