import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../constants/config";
import { usePerfumeContext } from "../context/PerfumeContext";
import api from "../services/api";

const PerfumeDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { triggerRefresh } = usePerfumeContext();
  const insets = useSafeAreaInsets();

  const fetchPerfume = async () => {
    try {
      const res = await api.get(`/perfumes/${id}`);
      setPerfume(res.data.perfume);
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
              triggerRefresh();
              Alert.alert("Deleted", "Perfume has been removed.");
              router.push("/");
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
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" color="#444" style={styles.loader} />
      </View>
    );
  }

  if (!perfume) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Text style={styles.error}>Perfume not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.card}>
        {perfume.photo && (
          <Image
            source={{ uri: `${BASE_URL}/${perfume.photo}` }}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>{perfume.name}</Text>
        <Text style={styles.item}>
          Brand: <Text style={styles.value}>{perfume.brand}</Text>
        </Text>
        <Text style={styles.item}>
          Type: <Text style={styles.value}>{perfume.type}</Text>
        </Text>
        <Text style={styles.item}>
          Season: <Text style={styles.value}>{perfume.season}</Text>
        </Text>
        <Text style={styles.item}>
          Intensity: <Text style={styles.value}>{perfume.intensity}</Text>
        </Text>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.deleteText}>Delete Perfume</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  loader: {
    marginTop: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
  },
  value: {
    fontWeight: "500",
    color: "#000",
  },
  error: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c0392b",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default PerfumeDetailsScreen;
