## Crafty-app

Made by crafty-app.com

# Date picker

A light date/time picker for react-native or expo

## Usage

List of possible values:

startDate:

```bash
  Defines the minimum date that can be selected
```

mode:

```bash
  Defines the type of the picker
  List of possible values
  "date" default
  "Time"
```

isTransparent:

```bash
   Hide/show app background when picker shows up
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
  triggerd when on cancel is pressed required!
```

onConfirm:

```bash
  "onConfirm" returns date value when pressed required!
```

step:

```bash
  The interval at which minutes can be selected
```

## Usage/Examples

### DatePicker

```javascript
import DatePicker from "./DatePicker";

export default function App() {
  const [date, setdate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [mode, setmode] = useState("date");
  const show = mode => {
    setShowModal(true);
    setmode(mode);
  };
  const confirm = value => {
    setdate(value);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {showModal && (
        <DatePicker
          date={date}
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

## Screenshots

<table>
   <tr>
   <td><img src="https://raw.githubusercontent.com/kz370/React-native-light-datePicker/main/DatePicker/images/Datepicker.PNG" alt="React Native DateTime Picker Modal" height="300px" style="margin-left:10px" /></td>
  </tr>
</table>

### TimePicker

```javascript
import DatePicker from "./DatePicker";

export default function App() {
  const [date, setdate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [mode, setmode] = useState("date");
  const show = mode => {
    setShowModal(true);
    setmode(mode);
  };
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

<table>
   <tr>
   <td><img src="https://raw.githubusercontent.com/kz370/React-native-light-datePicker/main/DatePicker/images/TimerPicker24hrs.PNG" alt="React Native DateTime Picker Modal" height="300px" style="margin-left:10px" /></td>
   <td><img src="https://raw.githubusercontent.com/kz370/React-native-light-datePicker/main/DatePicker/images/TimerPicker12hrs.PNG" alt="React Native DateTime Picker Modal" height="300px" style="margin-left:10px" /></td>
  </tr>
</table>
