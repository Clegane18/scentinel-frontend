import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../constants/config";

const PerfumeCard = ({ perfume }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        router.push({ pathname: "/perfume/[id]", params: { id: perfume.id } })
      }
      activeOpacity={0.85}
    >
      <BlurView intensity={90} tint="light" style={styles.card}>
        {perfume.photo ? (
          <Image
            source={{ uri: `${BASE_URL}/${perfume.photo}` }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome name="image" size={24} color="#bbb" />
          </View>
        )}

        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {perfume.name}
          </Text>
          <Text style={styles.info} numberOfLines={1}>
            {perfume.brand} • {perfume.type}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1.2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    overflow: "hidden",
    shadowColor: "#111",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 10,
    height: 92,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginRight: 16,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontWeight: "400",
  },
});

export default PerfumeCard;
