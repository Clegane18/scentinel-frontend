import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PerfumeProvider } from "../context/PerfumeContext";

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PerfumeProvider>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "My Perfume Collection",
                headerTransparent: true,
                headerBackVisible: false,
                headerBackground: () => (
                  <BlurView
                    intensity={90}
                    tint="light"
                    style={StyleSheet.absoluteFill}
                  />
                ),
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1a1a1a",
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
