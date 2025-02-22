import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const index = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gpa, setGPA] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [errors, setErrors] = useState({
    username: "",
    name: "",
    college: "",
    email: "",
    password: "",
    gpa: "",
    startYear: "",
    endYear: "",
    description: "",
    leetcode: "",
    linkedin: "",
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isValidUrl = (url: string) =>
    /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}.*$/.test(url);

  const validateFields = () => {
    let newErrors = { ...errors };

    newErrors.username = username ? "" : "Username is required.";
    newErrors.name = name ? "" : "Name is required.";
    newErrors.college = college ? "" : "College name is required.";
    newErrors.email = isValidEmail(email) ? "" : "Enter a valid email address.";
    newErrors.password = isValidPassword(password)
      ? ""
      : "Password must be at least 8 characters, including uppercase, lowercase, numbers, and special symbols.";
    newErrors.gpa =
      isNaN(parseFloat(gpa)) || parseFloat(gpa) < 0 || parseFloat(gpa) > 10
        ? "Please enter a valid GPA (0 - 10)."
        : "";
    newErrors.startYear = /^\d{4}$/.test(startYear)
      ? ""
      : "Enter a valid start year (4 digits).";
    newErrors.endYear =
      /^\d{4}$/.test(endYear) && parseInt(startYear) < parseInt(endYear)
        ? ""
        : "Enter a valid end year (must be later than start year).";
    newErrors.description =
      description.split(" ").length > 100
        ? "Description should not exceed 100 words."
        : "";
    newErrors.leetcode = isValidUrl(leetcode)
      ? ""
      : "Enter a valid LeetCode profile URL.";
    newErrors.linkedin = isValidUrl(linkedin)
      ? ""
      : "Enter a valid LinkedIn profile URL.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSignup = () => {
    if (validateFields()) {
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } else {
      Alert.alert("Error", "Please fix the errors above.");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Signup</Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              onBlur={validateFields}
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              onBlur={validateFields}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>College Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your college name"
              value={college}
              onChangeText={setCollege}
              onBlur={validateFields}
            />
            {errors.college ? (
              <Text style={styles.errorText}>{errors.college}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={validateFields}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                onBlur={validateFields}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Text style={styles.toggleText}>
                  {secureTextEntry ? "Show" : "Hide"}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current GPA (0-10)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your GPA"
              value={gpa}
              onChangeText={setGPA}
              keyboardType="numeric"
              onBlur={validateFields}
            />
            {errors.gpa ? (
              <Text style={styles.errorText}>{errors.gpa}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course Start Year</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter start year (e.g., 2020)"
              value={startYear}
              onChangeText={setStartYear}
              keyboardType="numeric"
              onBlur={validateFields}
            />
            {errors.startYear ? (
              <Text style={styles.errorText}>{errors.startYear}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course End Year</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter end year (e.g., 2024)"
              value={endYear}
              onChangeText={setEndYear}
              keyboardType="numeric"
              onBlur={validateFields}
            />
            {errors.endYear ? (
              <Text style={styles.errorText}>{errors.endYear}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Short Description</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Write a short description (Max 100 words)"
              value={description}
              onChangeText={setDescription}
              multiline
              onBlur={validateFields}
            />
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>LeetCode Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your LeetCode profile URL"
              value={leetcode}
              onChangeText={setLeetcode}
              autoCapitalize="none"
              keyboardType="url"
              onBlur={validateFields}
            />
            {errors.leetcode ? (
              <Text style={styles.errorText}>{errors.leetcode}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>LinkedIn Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your LinkedIn profile URL"
              value={linkedin}
              onChangeText={setLinkedin}
              autoCapitalize="none"
              keyboardType="url"
              onBlur={validateFields}
            />
            {errors.linkedin ? (
              <Text style={styles.errorText}>{errors.linkedin}</Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  inputContainer: { width: "100%", marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#555" },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingLeft: 10,
    borderRadius: 8,
  },
  passwordWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingLeft: 10,
    borderRadius: 8,
  },
  toggleText: { color: "#007BFF", fontSize: 16 },
  descriptionInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingLeft: 10,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  errorText: { color: "red", fontSize: 12, marginTop: 5 },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
