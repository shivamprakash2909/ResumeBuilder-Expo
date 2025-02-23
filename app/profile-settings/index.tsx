import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const index = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    // Implement sign out functionality here
  };

  const handleUpgradeApp = () => {
    // Implement upgrade functionality here
  };

  const handleDeactivateAccount = () => {
    // Implement deactivate account functionality here
  };

  const handleEditProfileDetails = () => {
    // Show the modal for editing user details
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Profile Picture */}
        <Image
          source={require("../../assets/logo/github-logo.png")}
          style={styles.profileImage}
        />

        {/* Display User Details */}
        <Text style={styles.username}>User Name</Text>
        <Text style={styles.detailsText}>College Name: XYZ University</Text>
        <Text style={styles.detailsText}>Applied Resumes: 5</Text>

        {/* Edit Details Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfileDetails}
        >
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>

        {/* Logout, Upgrade, and Deactivate Account Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpgradeApp}>
          <Text style={styles.buttonText}>Buy Pro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleDeactivateAccount}
        >
          <Text style={styles.buttonText}>Deactivate Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for editing profile details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Details</Text>
            {/* Add any form or fields for editing user details here */}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={closeModal}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#f7f7f7", // Optional background color for the page
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light transparent background for the card
    borderRadius: 10,
    alignItems: "center",
    boxShadow: "0px 5px 10px #050404",
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#606061",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  closeModalButton: {
    backgroundColor: "#606061",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeModalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
