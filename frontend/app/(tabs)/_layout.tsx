import SosModal from "@/components/molecules/SosModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          // tabBarActiveBackgroundColor: "lightblue",
          // tabBarInactiveBackgroundColor: "lightgray",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <Entypo name="home" size={24} color={color} />
              ) : (
                <AntDesign name="home" size={24} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="map-marker" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="sosButton"
          options={{
            title: "SOS",
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="sos" size={28} color={color} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={{
                  top: -20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#d81f50ff",
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  shadowColor: "#000",
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <MaterialIcons name="sos" size={28} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => {
              return <AntDesign name="user" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => {
              return <AntDesign name="setting" size={24} color={color} />;
            },
          }}
        />
      </Tabs>
      <SosModal isVisible={isModalVisible} onClose={closeModal} />
    </>
  );
}
