import { StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.text}>
        If you encounter any issues, please reach out to us at
      </Text>
      <Text style={styles.contactInfo}>Email: shivamprakash444@gmail.com</Text>
      <Text style={styles.contactInfo}>Phone: +91 8789520227</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  contactInfo: {
    fontSize: 16,
    textAlign: "center",
    color: "#007bff",
    fontWeight: "bold",
  },
});
