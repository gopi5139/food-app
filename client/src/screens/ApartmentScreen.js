import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createApartment } from "../api/authApi";

const ApartmentScreen = () => {
  const [apartment, setApartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveApartment = async () => {
    if (apartment.trim().length === 0) {
      Alert.alert("Validation Error", "Apartment name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
            const response = await createApartment({apartment});
            
            if (response && response.data && response.data.success) {
                Alert.alert("Success", "Apartment added successfully!");
                setApartment('');
            } else {
                Alert.alert("Error", response.data.message || "Failed to add apartment.");
            }
          } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
          } finally {
            setLoading(false);
          }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add Apartment</Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
          width: '80%',
          marginTop: 20,
          padding: 10,
          fontSize: 16
        }}
        placeholder="Enter Apartment Name"
        value={apartment}
        onChangeText={setApartment}
      />
      <TouchableOpacity
        onPress={handleSaveApartment}
        disabled={loading}
        style={{
          marginTop: 20,
          backgroundColor: loading ? 'gray' : 'blue',
          padding: 10,
          width: '80%',
          alignItems: 'center',
          borderRadius: 5
        }}
      >
        <Text style={{ color: 'white' }}>{loading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApartmentScreen;
