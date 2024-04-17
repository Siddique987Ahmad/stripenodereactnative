import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button } from "react-native";

const Payment = () => {
  const [name, setName] = useState("");
  const stripe = useStripe();

  const subscribe = async () => {
    try {
      const response = await fetch("http://192.168.0.108:8080/pay", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);

      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });

      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      Alert.alert("Payment Completed,Thank You");
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong,try again later");
    }
  };

  return (
    <View>
      {/* <Text>Payment</Text> */}
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      />
      <Button title="Subscribe" onPress={subscribe} />
    </View>
  );
};
export default Payment;
