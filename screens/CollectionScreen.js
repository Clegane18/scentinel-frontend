import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import PerfumeCard from "../components/PerfumeCard";
import api from "../services/api";

const CollectionScreen = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerfumes = async () => {
    try {
      const response = await api.get("/perfumes");
      setPerfumes(response.data);
    } catch (error) {
      console.error("Error fetching perfumes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Perfume Collection</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={perfumes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PerfumeCard perfume={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default CollectionScreen;
