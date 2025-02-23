import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
  router as expoRouter,
} from "expo-router";

const { width } = Dimensions.get("window");
const pageHeight = width * 1.414;

const templates = [
  {
    id: "1",
    name: "Template 1",
    image: require("../../assets/template/resume_template_1.png"),
  },
  {
    id: "2",
    name: "Template 2",
    image: require("../../assets/template/resume_template_2.png"),
  },
  {
    id: "3",
    name: "Template 3",
    image: require("../../assets/template/resume_template_3.png"),
  },
  {
    id: "4",
    name: "Template 4",
    image: require("../../assets/template/resume_template_4.png"),
  },
  {
    id: "5",
    name: "Template 5",
    image: require("../../assets/template/resume_template_5.png"),
  },
];

const icons = {
  profile: require("../../assets/logo/profile_logo.png"),
};

const index = () => {
  const router = useRouter();
  const { selectedRepos } = useLocalSearchParams<{ selectedRepos: string }>(); // Get selectedRepos from the route params
  const [modalVisible, setModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [confirmedTemplate, setConfirmedTemplate] = useState<string | null>(
    null
  );
  const [zoomLevel, setZoomLevel] = useState(new Animated.Value(1));

  const handleCreateNew = () => setModalVisible(true);
  const handlePreviewResume = () => setPreviewModalVisible(true);
  const handleTemplateSelect = (templateId: string) =>
    setSelectedTemplate(templateId);

  const handleConfirmSelection = () => {
    setConfirmedTemplate(selectedTemplate);
    setModalVisible(false);

    // Navigate to the repository selection page
    router.push({
      pathname: "/final-resume" as any,
      params: { selectedTemplate, selectedRepos },
    });
  };

  const closeModal = () => setModalVisible(false);
  const closePreviewModal = () => setPreviewModalVisible(false);
  const selectedTemplateImage = templates.find(
    (template) => template.id === confirmedTemplate
  )?.image;

  return (
    <View style={styles.container}>
      <View style={styles.centeredBox}>
        <TouchableOpacity style={styles.mainButton} onPress={handleCreateNew}>
          <Text style={styles.mainButtonText}>Select Template</Text>
        </TouchableOpacity>

        {confirmedTemplate && (
          <Text style={styles.selectedText}>
            Selected Template: {confirmedTemplate}
          </Text>
        )}

        {/* Profile Button placed below the selected template */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => expoRouter.replace("profile-settings" as any)}
        >
          <Image source={icons.profile} style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Create New Resume Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Resume Template</Text>

            <FlatList
              data={templates}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.templateCard,
                    item.id === selectedTemplate && styles.selectedTemplate,
                  ]}
                  onPress={() => handleTemplateSelect(item.id)}
                >
                  <Image source={item.image} style={styles.templateImage} />
                  <Text style={styles.templateText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            {selectedTemplate && (
              <TouchableOpacity
                style={styles.selectButton}
                onPress={handleConfirmSelection}
              >
                <Text style={styles.selectButtonText}>Select Template</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
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
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  centeredBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center", // Align children horizontally
    justifyContent: "center", // Align children vertically
  },
  mainButton: {
    backgroundColor: "#24292e",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  navIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  navText: {
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
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  templateCard: {
    width: width - 120,
    height: pageHeight - 80,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  selectedTemplate: {
    borderColor: "#007bff",
    borderWidth: 3,
  },
  templateImage: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  templateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  selectButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
