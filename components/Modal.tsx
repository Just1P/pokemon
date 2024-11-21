import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

const CustomPicker = ({ options, selectedValue, onValueChange }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.input}>
        <Text>{selectedValue || "Choisir un type"}</Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onValueChange(item.name);
                  setVisible(false);
                }}
                style={styles.option}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: "80%",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  option: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff6666",
    borderRadius: 8,
    width: 150,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CustomPicker;
