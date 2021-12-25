import logo from './logo.svg';
import './App.css';

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
        
      </div>
    </div>
  );

  
}

export default App;
