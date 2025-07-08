import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import api from "../services/api";

const AddPerfumeScreen = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    type: "",
    season: "",
    intensity: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/perfumes", form);
      Alert.alert("Success", "Perfume added!");
      router.push("/"); // Go back to CollectionScreen
    } catch (error) {
      const message = error.response?.data?.error || "Failed to add perfume.";
      Alert.alert("Error", message);
      console.error("Create Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(val) => handleChange("name", val)}
      />

      <Text style={styles.label}>Brand:</Text>
      <TextInput
        style={styles.input}
        value={form.brand}
        onChangeText={(val) => handleChange("brand", val)}
      />

      <Text style={styles.label}>Type (e.g., EDP, EDT):</Text>
      <TextInput
        style={styles.input}
        value={form.type}
        onChangeText={(val) => handleChange("type", val)}
      />

      <Text style={styles.label}>Season (e.g., Summer, Winter):</Text>
      <TextInput
        style={styles.input}
        value={form.season}
        onChangeText={(val) => handleChange("season", val)}
      />

      <Text style={styles.label}>Intensity (e.g., Fresh, Sweet):</Text>
      <TextInput
        style={styles.input}
        value={form.intensity}
        onChangeText={(val) => handleChange("intensity", val)}
      />

      <Button title="Add Perfume" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#fff",
    color: "#000",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
});

export default AddPerfumeScreen;
