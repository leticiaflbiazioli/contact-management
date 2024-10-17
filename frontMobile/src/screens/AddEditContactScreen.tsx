import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from '../types';
import {TextInputMask} from 'react-native-masked-text';
import {API_URL} from '../../config';

type AddEditContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Add or edit contact'
>;
type AddEditContactScreenRouteProp = RouteProp<
  RootStackParamList,
  'Add or edit contact'
>;

interface AddEditContactScreenProps {
  navigation: AddEditContactScreenNavigationProp;
  route: AddEditContactScreenRouteProp;
  setIsAuthenticated: (value: boolean) => void;
}

const AddEditContactScreen: React.FC<AddEditContactScreenProps> = ({
  route,
  navigation,
  setIsAuthenticated,
}) => {
  const contact = route.params?.contact || ({} as Contact);
  const [name, setName] = useState(contact.name || '');
  const [surname, setSurname] = useState(contact.surname || '');
  const [phone, setPhone] = useState(contact.phone || '');
  const [birthDate, setBirthDate] = useState(
    contact.birthDate || '',
  );
  const [address, setAddress] = useState(contact.address || '');
  const [email, setEmail] = useState(contact.email || '');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const isValidDate = (date: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(date);
  };

  const handleSave = async () => {
    if (
      !name ||
      !surname ||
      !phone ||
      !birthDate ||
      !address ||
      !email
    ) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      Alert.alert(
        'Error',
        'Invalid Phone! Format must be (XX)XXXX-XXXX.',
      );
      return;
    }

    if (!isValidDate(birthDate)) {
      Alert.alert(
        'Erro',
        'Invalid date of birth! The format must be DD/MM/YYYY.',
      );
      return;
    }

    try {
      const authentication = await AsyncStorage.getItem('token');
      if (contact._id) {
        // Edit contact
        await axios.put(
          `${API_URL}/contacts/${contact._id}`,
          {
            name,
            surname,
            phone,
            birthDate,
            address,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${authentication}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        // Add a new contact
        await axios.post(
          `${API_URL}/contacts`,
          {
            name,
            surname,
            phone,
            birthDate,
            address,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${authentication}`,
              'Content-Type': 'application/json',
            },
          },
        );
      }
      navigation.goBack();
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        textContentType="namePrefix"
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
        textContentType="nameSuffix"
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '(99) 99999-9999',
        }}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '99/99/9999',
        }}
        placeholder="Date of Birth"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Adress"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button title="Save" onPress={handleSave} color="#144C77" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AddEditContactScreen;
