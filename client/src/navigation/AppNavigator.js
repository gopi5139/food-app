import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import UpdateProfile from "../screens/UpdateProfile";
import ApartmentScreen from "../screens/ApartmentScreen";
import HomeScreen from "../screens/ApartmentScreen";
import ProfileScreen from "../screens/ApartmentScreen";
import AdminUserScreen from "../screens/ApartmentScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="home" size={size} color={color} />) }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color} />) }} 
      />
      <Tab.Screen 
        name="Apartments"  // ✅ Matches navigation in CustomMainTab
        component={ApartmentScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (<Ionicons name="business" size={size} color={color} />), 
          title: "Apartments" 
        }} 
      />
      <Tab.Screen 
        name="AdminUsers" 
        component={AdminUserScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (<Ionicons name="people" size={size} color={color} />), 
          title: "Admin Users" 
        }} 
      />
    </Tab.Navigator>
  );
};

// Stack Navigator (for Login, OTP, and Other Screens)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* No navbar for login and OTP screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

        {/* ApartmentScreen and AdminUsers added for direct navigation */}
        {/* <Stack.Screen name="Apartments" component={ApartmentScreen} />
        <Stack.Screen name="AdminUsers" component={AdminUserScreen} /> */}

        {/* Bottom tab navigator (has navbar) */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

