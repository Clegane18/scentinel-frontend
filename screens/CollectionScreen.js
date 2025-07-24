import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import PerfumeCard from "../components/PerfumeCard";
import { usePerfumeContext } from "../context/PerfumeContext";
import api from "../services/api";

const RightAction = ({
  progress,
  distance,
  style,
  iconName,
  iconColor = "#fff",
  onPress,
  iconSize = 22,
}) => {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [distance, 0],
  });

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const CollectionScreen = () => {
  const router = useRouter();
  const { refreshFlag, triggerRefresh } = usePerfumeContext();

  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const swipeableRefs = useRef(new Map());

  const fetchPerfumes = async () => {
    try {
      setError(null);
      const response = await api.get("/perfumes");
      setPerfumes(response.data.perfumes);
    } catch (err) {
      console.error("Error fetching perfumes:", err?.message || err);
      setError("Failed to load perfumes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPerfumes();
  }, [refreshFlag]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPerfumes();
  };

  const closeSwipeable = (id) => {
    const ref = swipeableRefs.current.get(id);
    if (ref) ref.close();
  };

  const handleEdit = (perfume) => {
    closeSwipeable(perfume.id);
    router.push({ pathname: "/edit", params: { id: perfume.id } });
  };

  const handleDelete = (perfume) => {
    closeSwipeable(perfume.id);

    Alert.alert(
      "Delete Perfume",
      `Are you sure you want to delete "${perfume.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/perfumes/${perfume.id}`);
              setPerfumes((prev) => prev.filter((p) => p.id !== perfume.id));
              triggerRefresh();
            } catch (err) {
              console.error("Delete error:", err);
              Alert.alert("Error", "Failed to delete the perfume.");
            }
            Vibration.vibrate(10);
          },
        },
      ]
    );
  };

  const renderRightActions = (progress, _dragX, perfume) => (
    <View style={styles.actionsContainer}>
      <RightAction
        progress={progress}
        distance={0}
        style={styles.deleteAction}
        iconName="trash"
        iconColor="#dc3545"
        onPress={() => handleDelete(perfume)}
      />
      <RightAction
        progress={progress}
        distance={65}
        style={styles.editAction}
        iconName="create-outline"
        iconColor="#007bff"
        onPress={() => handleEdit(perfume)}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      ref={(ref) => {
        if (ref && item?.id) swipeableRefs.current.set(item.id, ref);
      }}
      friction={2}
      overshootRight={false}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }
      onSwipeableWillOpen={() => {
        swipeableRefs.current.forEach((ref, key) => {
          if (key !== item.id && ref) ref.close();
        });
      }}
    >
      <PerfumeCard perfume={item} />
    </Swipeable>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="flask-outline" size={48} color="#bbb" />
      <Text style={styles.emptyText}>
        Your perfume shelf is empty. Tap "Add Perfume" to start your collection.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#444" />
        </View>
      ) : (
        <FlatList
          data={perfumes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.list,
            perfumes.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.floatingText}>Add Perfume</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
  },
  errorBanner: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: "#ffe0e0",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ff5c5c",
    borderWidth: 1,
  },
  errorText: {
    color: "#cc0000",
    fontSize: 14,
    textAlign: "center",
  },
  floatingButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#2f3b4c",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  floatingText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row-reverse",
    height: 92,
    marginBottom: 16,
    overflow: "hidden",
  },
  actionButton: {
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  editAction: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteAction: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CollectionScreen;
