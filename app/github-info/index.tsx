import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  const [githubLink, setGithubLink] = useState<string>(""); // Hook to navigate

  const handleSubmit = () => {
    if (githubLink) {
      console.log("GitHub Link:", githubLink);

      // Navigate to the main application page

      router.push({
        pathname: "/repository-selection",
        params: { githubLink },
      });
    } else {
      Alert.alert("Please enter a valid GitHub link");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your GitHub Link</Text>

      {/* GitHub URL Input */}
      <TextInput
        style={styles.input}
        value={githubLink}
        onChangeText={setGithubLink}
        placeholder="Enter GitHub Profile URL"
        keyboardType="url"
      />

      {/* Styled Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#24292e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
