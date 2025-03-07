import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendOTP } from "../api/authApi";

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    const navigation = useNavigation();

const validatePhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

    const handleSendOTP = async () => {
        if (phone.length === 10) {
            const response = await sendOTP(`+91${phone}`);
            if (response) {
                setConfirmation(response);
                navigation.navigate('OTPScreen', { phone: `+91${phone}` });
            } else {
                alert('Failed to send OTP');
            }
        } else {
            alert('Enter a valid phone number');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
            <TextInput
                style={{ borderBottomWidth: 1, width: '80%', marginTop: 20 }}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity onPress={handleSendOTP} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10 }}>
                <Text style={{ color: 'white' }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;