import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const index = () => {
  const { githubLink } = useLocalSearchParams<{ githubLink: string }>(); // Receive githubLink from the previous page
  const [repositories, setRepositories] = useState<any[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]); // Store selected repositories
  const router = useRouter();
  // Fetch repositories from GitHub
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const username = githubLink && githubLink.split("/").pop(); // Extract username from GitHub URL
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const data = await response.json();
        setRepositories(data); // Store fetched repositories
      } catch (error) {
        Alert.alert("Error", "Unable to fetch repositories. Please try again.");
        console.error("Error fetching repositories:", error);
      }
    };

    if (githubLink) {
      fetchRepositories();
    }
  }, [githubLink]);

  // Handle selecting a repository
  const handleSelectRepo = (repoName: string) => {
    setSelectedRepos((prev) =>
      prev.includes(repoName)
        ? prev.filter((repo) => repo !== repoName)
        : [...prev, repoName]
    );
  };

  // Handle the "Proceed" action
  const handleProceed = () => {
    if (selectedRepos.length > 0) {
      router.push({
        pathname: "/main-interface",
        params: { selectedRepos },
      });
    } else {
      Alert.alert(
        "No repositories selected",
        "Please select at least one repository."
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Repositories</Text>

      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.repoItem,
              selectedRepos.includes(item.name) && styles.selectedRepo,
            ]}
            onPress={() => handleSelectRepo(item.name)}
          >
            <Text style={styles.repoName}>{item.name}</Text>
            <Text style={styles.repoDesc}>
              {item.description || "No description available"}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      {selectedRepos.length > 0 && (
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>
            Proceed ({selectedRepos.length})
          </Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  repoItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedRepo: {
    borderColor: "#007bff",
    backgroundColor: "#e8f0ff",
  },
  repoName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  repoDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  proceedButton: {
    backgroundColor: "#24292e",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
