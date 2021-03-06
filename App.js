import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import react from "react";
import { useState, useEffect } from "react";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [nextArrival, setNextArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=59261";

  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Original Data :");
        console.log(responseData);
        const myBus = responseData.services.filter(
          (item) => item.no === "800"
        )[0];
        console.log("My Bus :");
        console.log(myBus.next.time);
        setArrival(myBus.next.duration_ms / 60000);
        setNextArrival(myBus.next2.duration_ms / 60000);
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arriving in</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="red" /> : arrival}
      </Text>
      <Text style={styles.mins}>mins</Text>
      <Text style={styles.title}>Next Bus Arriving in</Text>
      <Text style={styles.nextArrivalTime}>
        {loading ? <ActivityIndicator size="large" color="red" /> : nextArrival}
      </Text>
      <Text style={styles.mins}>mins</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refresh !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "green",
    margin: 60,
    padding: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 30,
  },
  arrivalTime: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    paddingTop: 10,
    paddingBottom: 0,
    color: "red",
  },
  nextArrivalTime: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    paddingTop: 10,
    paddingBottom: 0,
    color: "blue",
  },
  mins: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    paddingTop: 10,
    paddingBottom: 0,
    color: "black",
  },
});
