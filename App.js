import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Payment from "./components/Payment";

export default function App() {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51OpWHhDLmcikuzMTl7wE7lDhh2rQagGnrm95KUyzQmLVdX97HA69wvuU6g9HcUwqdGc3UifSXbDS3kyz3EjB9Xtp009yYurKkt">
        <Payment />
      </StripeProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
