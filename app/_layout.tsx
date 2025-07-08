import { Stack } from "expo-router";
import { PerfumeProvider } from "../context/PerfumeContext";

export default function Layout() {
  return (
    <PerfumeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "My Perfume Collection",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="add/index"
          options={{
            title: "Add Perfume",
          }}
        />
        <Stack.Screen
          name="perfume/[id]"
          options={{
            title: "Perfume Details",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="edit/index"
          options={{
            title: "Edit Perfume Details",
          }}
        />
      </Stack>
    </PerfumeProvider>
  );
}
