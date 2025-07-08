import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
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

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const res = await api.get(`/perfumes/${id}`);
        const { name, brand, type, season, intensity } = res.data;
        setForm({ name, brand, type, season, intensity });
      } catch (err) {
        Alert.alert("Error", "Failed to load perfume");
      }
    };
    fetchPerfume();
  }, []);

  const handleChange = (key: keyof EditablePerfumeFields, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/perfumes/${id}`, form);
      Alert.alert("Success", "Perfume updated!");
      router.push("/");
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
            {field[0].toUpperCase() + field.slice(1)}:
          </Text>
          <TextInput
            style={styles.input}
            value={form[field as keyof EditablePerfumeFields]}
            onChangeText={(val) =>
              handleChange(field as keyof EditablePerfumeFields, val)
            }
          />
        </View>
      ))}
      <Button title="Update Perfume" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default EditPerfumeScreen;
