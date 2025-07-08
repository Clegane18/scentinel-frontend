import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PerfumeCard = ({ perfume }) => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.details}
        onPress={() =>
          router.push({ pathname: "/perfume/[id]", params: { id: perfume.id } })
        }
      >
        <Text style={styles.name}>{perfume.name}</Text>
        <Text style={styles.info}>
          {perfume.brand} • {perfume.type}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.icon}
        onPress={() =>
          router.push({ pathname: "/edit", params: { id: perfume.id } })
        }
      >
        <FontAwesome name="edit" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  info: {
    color: "#666",
  },
  icon: {
    marginLeft: 10,
    padding: 8,
  },
});

export default PerfumeCard;
