import { StyleSheet, Text, View } from "react-native";

const PerfumeCard = ({ perfume }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{perfume.name}</Text>
      <Text style={styles.brand}>{perfume.brand}</Text>
      <Text style={styles.info}>Type: {perfume.type}</Text>
      <Text style={styles.info}>Season: {perfume.season}</Text>
      <Text style={styles.info}>Intensity: {perfume.intensity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  brand: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: "#666",
  },
});

export default PerfumeCard;
