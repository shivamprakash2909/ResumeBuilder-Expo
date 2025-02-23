import {
  Alert,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Linking from "expo-linking";

const getHostFromURL = async () => {
  const url = await Linking.getInitialURL();
  if (url) {
    const parsedUrl = Linking.parse(url);
    return parsedUrl.hostname; // This will give you the host
  }
  return null;
};

const index = () => {
  const { selectedTemplate, selectedRepos } = useLocalSearchParams<{
    selectedTemplate: string;
    selectedRepos: string;
  }>();
  const selectedReposData = selectedRepos.split(",");
  console.log("selectedTemplate", selectedTemplate);
  console.log("selectedRepos", selectedRepos);
  console.log("type-selectedRepos", typeof selectedRepos);
  const [resumeVisible, setResumeVisible] = useState(true);

  // Store the applied date and time (current timestamp)
  const [appliedDate, setAppliedDate] = useState<string>("");

  // Function to get formatted current date and time
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    // Save the timestamp when the page loads (i.e., resume is applied)
    const timestamp = Date.now();
    const formattedDate = formatDate(timestamp);
    setAppliedDate(formattedDate);
  }, []);
  // Share Resume
  const handleShareResume = async () => {
    try {
      // Construct the URL to this page with the necessary query parameters
      const baseurl = await getHostFromURL();
      const shareUrl = `${baseurl}/final-resume?selectedTemplate=${selectedTemplate}&selectedRepos=${selectedRepos}`;
      const resumeText = `Resume Details:\nTemplate: ${selectedTemplate}\nLink to access: ${shareUrl}`;
      // Use the Share API to share the URL
      await Share.share({ message: resumeText });
    } catch (error) {
      console.error("Error sharing resume:", error);
      Alert.alert("Error", "Failed to share the resume. Please try again.");
    }
  };

  // Download Resume (Simulated)
  const handleDownloadResume = async () => {
    try {
      // Generate HTML content for the resume
      const htmlContent = `
        <html>
          <body>
            <h1>Resume Information</h1>
            <h2>Selected Template: ${selectedTemplate}</h2>
            <h3>Selected Repositories:</h3>
            <ul>
              ${selectedReposData.map((repo) => `<li>${repo}</li>`).join("")}
            </ul>
            <p>Applied On: ${appliedDate}</p>
          </body>
        </html>
      `;

      // Generate PDF
      const options = {
        html: htmlContent,
        fileName: `Resume_${Date.now()}`, // Unique filename
        directory: "Documents", // Save in the Documents folder
      };

      const pdf = await RNHTMLtoPDF.convert(options);

      // Trigger download
      Alert.alert(
        "Download Successful!",
        `Your resume has been downloaded to ${pdf.filePath}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert(
        "Error",
        "Failed to generate the resume PDF. Please try again."
      );
    }
  };

  // Delete Resume
  const handleDeleteResume = () => {
    Alert.alert(
      "Delete Resume",
      "Are you sure you want to delete this resume?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => setResumeVisible(false),
          style: "destructive",
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      {resumeVisible ? (
        <View style={styles.infoBox}>
          {/* Resume Info Box */}
          <View style={styles.infoLeft}>
            <Text style={styles.title}>Resume Information</Text>

            {/* Selected Template */}
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Selected Template:</Text>
              <Text style={styles.template}>{selectedTemplate}</Text>
            </View>

            {/* Selected Repositories */}
            <View style={styles.infoItem}>
              <Text style={styles.repoTitle}>Selected Repositories:</Text>
              <FlatList
                data={selectedReposData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.repoItem}>
                    <Text style={styles.repoName}>{item}</Text>
                  </View>
                )}
              />
            </View>

            {/* Applied Date and Time */}
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Applied On:</Text>
              <Text style={styles.appliedDateText}>{appliedDate}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.infoRight}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShareResume}
            >
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownloadResume}
            >
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteResume}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.deletedText}>Resume Deleted</Text>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    flexWrap: "wrap", // Allow content to wrap inside the box
    justifyContent: "space-between", // Space out the left and right sections
  },

  infoLeft: {
    flex: 2,
    alignItems: "flex-start",
  },

  infoRight: {
    paddingLeft: 20,
    alignItems: "center",
  },

  infoItem: {
    marginBottom: 10,
    width: "100%",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  template: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },

  repoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  repoItem: {
    backgroundColor: "#ffffff",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },

  repoName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  shareButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },

  downloadButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#D9534F",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  deletedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D9534F",
    marginTop: 20,
  },

  appliedDateText: {
    fontSize: 16,
    color: "#555",
    textAlign: "left", // Aligning the date properly within the box
    fontWeight: "normal", // Make the date text lighter for better readability
  },
});
