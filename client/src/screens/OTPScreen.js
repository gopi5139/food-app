import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Alert } from "react-native";
import { verifyOTP } from "../api/authApi";

const OTPScreen = ({ route, navigation }) => {
    const { phone } = route.params;
    const [otp, setOTP] = useState("");

    const handleVerifyOTP = async () => {
        if (!phone) {
            Alert.alert("Error", "Phone number is missing!");
            return;
        }
        try {
            const res = await verifyOTP(phone, otp);
            if (res.data.success) {
                navigation.navigate("UpdateProfile", { phone });
            } else {
                Alert.alert("Error", res.data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to verify OTP. Please try again.");
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>OTP</Text>
            <TextInput placeholder="Enter OTP" style={{ borderBottomWidth: 1, width: '80%', marginTop: 20 }} keyboardType="number-pad" value={otp} onChangeText={setOTP} />
            <TouchableOpacity onPress={handleVerifyOTP} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10 }}>
                <Text style={{ color: 'white' }}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OTPScreen;
