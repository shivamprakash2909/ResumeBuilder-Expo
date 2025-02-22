import { router } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Logo or Illustration */}
      <Image
        source={{
          uri: "https://static-00.iconduck.com/assets.00/github-emoji-256x252-5rckwyt5.png",
        }} // Replace with your logo/image URL
        style={styles.logo}
      />

      {/* Title and Tagline */}
      <Text style={styles.title}>Resume Builder</Text>
      <Text style={styles.tagline}>
        Build a professional resume in seconds using your GitHub profile.
      </Text>

      {/* Login & Signup Buttons in Same Line */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => router.replace("/signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Links */}
      <Text style={styles.footerText}>
        Need help?{" "}
        <Text
          style={styles.link}
          // onPress={() => navigation.navigate("Help")}
        >
          Contact Support
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  // Container for Login & Signup buttons
  buttonContainer: {
    flexDirection: "row", // Place buttons in a row
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    flex: 1, // Make buttons take equal width
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10, // Add spacing between buttons
  },
  loginButton: {
    backgroundColor: "#24292e", // Dark color for Login
  },
  signupButton: {
    backgroundColor: "#24292e", // Blue color for Signup
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
