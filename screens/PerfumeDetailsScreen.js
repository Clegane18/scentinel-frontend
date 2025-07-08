import { useLocalSearchParams, useRouter } from "expo-router"; // ✅ fixed
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePerfumeContext } from "../context/PerfumeContext";
import api from "../services/api";

const PerfumeDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter(); // ✅ added
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { triggerRefresh } = usePerfumeContext();

  const fetchPerfume = async () => {
    try {
      const res = await api.get(`/perfumes/${id}`);
      setPerfume(res.data);
    } catch (error) {
      console.error("Fetch perfume error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Perfume",
      "Are you sure you want to delete this perfume?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/perfumes/${id}`);
              triggerRefresh(); // ✅ refresh the collection screen
              Alert.alert("Deleted", "Perfume has been removed.");
              router.push("/"); // ✅ navigate back
            } catch (error) {
              Alert.alert("Error", "Failed to delete perfume.");
              console.error("Delete Error:", error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchPerfume();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!perfume) {
    return <Text style={styles.error}>Perfume not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{perfume.name}</Text>
      <Text style={styles.item}>Brand: {perfume.brand}</Text>
      <Text style={styles.item}>Type: {perfume.type}</Text>
      <Text style={styles.item}>Season: {perfume.season}</Text>
      <Text style={styles.item}>Intensity: {perfume.intensity}</Text>

      <View style={styles.deleteButton}>
        <Button title="Delete Perfume" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 18, marginBottom: 5 },
  error: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
  deleteButton: { marginTop: 30 },
});

export default PerfumeDetailsScreen;
