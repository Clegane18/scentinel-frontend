import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../../constants/config";
import { usePerfumeContext } from "../../context/PerfumeContext";
import api from "../../services/api";

type EditablePerfumeFields = {
  name: string;
  brand: string;
  type: string;
  season: string;
  intensity: string;
};

const EditPerfumeScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<EditablePerfumeFields>({
    name: "",
    brand: "",
    type: "",
    season: "",
    intensity: "",
  });

  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<ImagePicker.ImagePickerAsset | null>(
    null
  );
  const { triggerRefresh } = usePerfumeContext();

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const res = await api.get(`/perfumes/${id}`);
        const { name, brand, type, season, intensity, photo } =
          res.data.perfume;
        setForm({ name, brand, type, season, intensity });
        setCurrentPhoto(photo || null);
      } catch (err) {
        Alert.alert("Error", "Failed to load perfume");
      }
    };
    fetchPerfume();
  }, []);

  const handleChange = (key: keyof EditablePerfumeFields, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      for (const key in form) {
        data.append(key, form[key as keyof EditablePerfumeFields]);
      }

      if (newImage) {
        const uriParts = newImage.uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        data.append("photo", {
          uri: newImage.uri,
          name: `perfume.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      await api.put(`/perfumes/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      triggerRefresh();
      Alert.alert("Success", "Perfume updated!");
      router.replace("/");
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Failed to update perfume.";
      Alert.alert("Error", message);
      console.error("Update Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(form).map((field) => (
        <View key={field}>
          <Text style={styles.label}>
            {field[0].toUpperCase() + field.slice(1)}
          </Text>
          <TextInput
            style={styles.input}
            value={form[field as keyof EditablePerfumeFields]}
            placeholder={`Enter ${field}`}
            placeholderTextColor="#aaa"
            onChangeText={(val) =>
              handleChange(field as keyof EditablePerfumeFields, val)
            }
          />
        </View>
      ))}

      <View style={styles.imagePreviewContainer}>
        {newImage ? (
          <Image source={{ uri: newImage.uri }} style={styles.imagePreview} />
        ) : currentPhoto ? (
          <Image
            source={{ uri: `${BASE_URL}/${currentPhoto}` }}
            style={styles.imagePreview}
          />
        ) : (
          <Text style={styles.noImage}>No image selected</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePickImage}>
        <Text style={styles.buttonText}>Pick New Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 16 }]}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>Update Perfume</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  noImage: {
    color: "#888",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#2f3b4c",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default EditPerfumeScreen;
