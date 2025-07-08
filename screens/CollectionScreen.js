import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import PerfumeCard from "../components/PerfumeCard";
import { usePerfumeContext } from "../context/PerfumeContext";
import api from "../services/api";
import styles from "../styles/collectionScreen";
const router = useRouter();

const CollectionScreen = () => {
  const { refreshFlag } = usePerfumeContext();
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerfumes = async () => {
    try {
      setLoading(true);
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
  }, [refreshFlag]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button title="Add New Perfume" onPress={() => router.push("/add")} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={perfumes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PerfumeCard perfume={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default CollectionScreen;
