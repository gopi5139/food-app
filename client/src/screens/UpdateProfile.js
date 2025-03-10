import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigation = useNavigation();

    const handleSaveProfile = () => {
        if (email && address) {
            alert('Profile Saved Successfully!');
            navigation.navigate("MainApp", { screen: "Apartments" });
        } else {
            alert('Please fill all details');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Complete Your Profile</Text>
            <TextInput
                style={{ borderBottomWidth: 1, width: '80%', marginTop: 20 }}
                placeholder="Enter Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={{ borderBottomWidth: 1, width: '80%', marginTop: 20 }}
                placeholder="Enter Address"
                value={address}
                onChangeText={setAddress}
            />
            <TouchableOpacity onPress={handleSaveProfile} style={{ marginTop: 20, backgroundColor: 'green', padding: 10 }}>
                <Text style={{ color: 'white' }}>Save & Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfile;
