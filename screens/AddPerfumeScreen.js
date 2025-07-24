import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
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

  const [image, setImage] = useState(null);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert("Permission needed", "Please allow access to photos.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (image) {
        formData.append("photo", {
          uri: image.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      await api.post("/perfumes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Perfume added!");
      router.push("/");
    } catch (error) {
      const message = error.response?.data?.error || "Failed to add perfume.";
      Alert.alert("Error", message);
      console.error("Create Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(val) => handleChange("name", val)}
          placeholder="Enter perfume name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          value={form.brand}
          onChangeText={(val) => handleChange("brand", val)}
          placeholder="Enter brand name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Type</Text>
        <TextInput
          style={styles.input}
          value={form.type}
          onChangeText={(val) => handleChange("type", val)}
          placeholder="EDP, EDT..."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Season</Text>
        <TextInput
          style={styles.input}
          value={form.season}
          onChangeText={(val) => handleChange("season", val)}
          placeholder="Summer, Winter..."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Intensity</Text>
        <TextInput
          style={styles.input}
          value={form.intensity}
          onChangeText={(val) => handleChange("intensity", val)}
          placeholder="Fresh, Sweet..."
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.photoPicker} onPress={pickImage}>
          <Text style={styles.photoPickerText}>
            {image ? "Change Photo" : "Upload Photo"}
          </Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image.uri }}
            style={styles.preview}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Perfume</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
  },
  photoPicker: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#2f3b4c",
  },
  photoPickerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2f3b4c",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddPerfumeScreen;
