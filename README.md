## Crafty-app

Made by <a href="https://crafty-app.com"> Crafty-app</a>

# Date picker

A light date/time picker for react-native

## Installation

npm:

```bash
  npm i @khaledz370/datetimepicker-react-native
```

yarn:

```bash
  yarn add @khaledz370/datetimepicker-react-native
```

# What's new

endDate:

```bash
  Defines the maximum date that can be selected
```

## Usage

List of possible values:

mode:

```bash
  Defines the type of the picker

  List of possible values
  "date" default
  "time"
```

isTransparent:

```bash
   Hide/show what is behind the date picker while datePicker is opened

   List of possible values
   true
   false default
```

hrs12:

```bash
   Allows changing of the time picker to a 12 hour format

   List of possible values
   true default
   false
```

date:

```bash
    Defines the date or time value used in the component.
```

onCancel:

```bash
  required!
  triggerd when on cancel is pressed
```

onConfirm:

```bash
   required!
   returns date value when pressed
```

startDate:

```bash
  Defines the minimum date that can be selected
```

step:

```bash
  The interval at which minutes can be selected
```

txtColor

```bash
  Change the color of text
  Default "black"
```

bgColor

```bash
  Change the back-ground color of datePicker
  Default "white"
```

btnColor

```bash
  Change the color of datePicker buttons including "Confirm" and "Cancel" buttons
  Default "black"
```

selectDayColor

```bash
  Set the color of the highlighted day in the calender
  default "skyblue"
```


## Usage/Examples

### DatePicker

```javascript
import DatePicker from "@khaledz370/datetimepicker-react-native";

export default function App() {
  const [date, setdate] = useState(null); // you can also use new Date()
  const [showModal, setShowModal] = useState(false);
  const confirm = value => {
    setdate(value);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {showModal && (
        <DatePicker
          startDate={new Date("6/20/2020")}
          date={date}
          mode="date"
          onCancel={() => setShowModal(false)}
          onConfirm={e => {
            confirm(e);
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
```

## Screenshots


<table>
   <tr>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/Datepicker.PNG" alt="React Native DateTime Picker Modal" height="400px"  style="margin-left:10px" /></td>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/monthPicker.PNG" alt="React Native DateTime Picker Modal" height="400px"  style="margin-left:10px" /></td>
  </tr>
</table>
<table>
   <tr>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/yearPicker.PNG" alt="React Native DateTime Picker Modal" height="400px"   style="margin-left:10px" /></td>
  </tr>
</table>

### TimePicker

```javascript
import DatePicker from "@khaledz370/datetimepicker-react-native";

export default function App() {
  const [time, setTime] = useState(null); // you can also use new Date()
  const [showModal, setShowModal] = useState(false);
  const confirm = value => {
    setTime(value);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {showModal && (
        <DatePicker
          date={time}
          mode="time"
          step={5}
          onCancel={() => setShowModal(false)}
          onConfirm={e => {
            confirm(e);
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
```

<table>
   <tr>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/TimerPicker24hrs.PNG" alt="React Native DateTime Picker Modal" height="300px" style="margin-left:10px" /></td>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/TimerPicker12hrs.PNG" alt="React Native DateTime Picker Modal" height="300px" style="margin-left:10px" /></td>
  </tr>
</table>
<br><br>

### DatePicker style example

```javascript
          <DatePicker
            ...
            txtColor="white"
            btnColor="lightgreen"
            bgColor="grey"
            selectDayColor="green"
          />
```

<table>
   <tr>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/customStyleDatePicker.PNG" alt="React Native DateTime Picker Modal" height="400px"  style="margin-left:10px" /></td>
   <td><img src="https://raw.githubusercontent.com/kz370/myImages/main/customStyleTimePicker.PNG" alt="React Native DateTime Picker Modal" height="300px"  style="margin-left:10px" /></td>
  </tr>
</table>

<br><br>

### Important For web view

```bash
Add this to app.json
  "web": {
      "build": {
        "babel": {
          "include": [
            "@khaledz370/datetimepicker-react-native"
          ]
        }
      }
    }
```