import React, { useState, useEffect } from 'react';
import { Button, Alert, ScrollView, TextInput, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // Add this line

const imgDir = 'http://192.168.1.243:3000/images/';
const ensureDirExists = async () => {};

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    status: '',
    interest: '',
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    ensureDirExists();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); // Updated permission request

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow location access to use this feature.');
    }
  };
  const pickImage = async () => {
  await getPermissionAsync();

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    // Use the first asset in the "assets" array
    setImage(result.assets[0].uri);
  }
};

const takePicture = async () => {
  await getPermissionAsync();

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    // Use the first asset in the "assets" array
    setImage(result.assets[0].uri);
  }
};
// Client-side code

const handleSubmit = async () => {
  try {
    // Step 1: Send text data and receive an ID
    const response = await fetch('http://192.168.1.81:3000/rate/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        age: formData.age,
        status: formData.status,
        interest: formData.interest,
      }),
    });

    if (!response.ok) {
      console.error(response.status, response.statusText);
      Alert.alert('Error', 'Oops! Something went wrong.');
      return;
    }

    const { id } = await response.json();

    // Step 2: Send image data with the received ID
    const formDataWithImage = new FormData();
    formDataWithImage.append('id', id); // Associate image with the record
    
    if (image) {
      const fileName = image.split('/').pop();
      const imageFile = {
        uri: image,
        name: fileName,
        type: 'image/jpg',
      };
      formDataWithImage.append('pic', imageFile);
    }

    const imageResponse = await fetch('http://192.168.1.81:3000/rate/image', {
      method: 'POST',
      body: formDataWithImage,
    });

    if (!imageResponse.ok) {
      console.error(imageResponse.status, imageResponse.statusText);
      Alert.alert('Error', 'Oops! Something went wrong.');
      return;
    }

    // Reset form state
    setFormData({ name: '', age: '', status: '', interest: '' });
    setImage(null);

    Alert.alert('Success', "You're good! Now watch the users come to you!");
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Oops! Something went wrong.');
  }
};



  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <Text>Sign up to meet dates</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Name"
            value={formData.name}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            placeholder="Age"
            value={formData.age}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFormData({ ...formData, status: text })}
            placeholder="Status"
            value={formData.status}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFormData({ ...formData, interest: text })}
            placeholder="Interest"
            value={formData.interest}
          />
        </View>
        <Button title="pick image" onPress={pickImage}>
          <Text>Pick an image from your gallery</Text>
        </Button>
        <Button  title="take pic" onPress={takePicture}>
          <Text>Take a picture</Text>
        </Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
    margin: 30,
  },
  input: {
    margin: 20,
  },
});
