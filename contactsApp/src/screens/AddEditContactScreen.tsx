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
  'Adicionar ou editar contato'
>;
type AddEditContactScreenRouteProp = RouteProp<
  RootStackParamList,
  'Adicionar ou editar contato'
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
  const [nome, setNome] = useState(contact.nome || '');
  const [sobrenome, setSobrenome] = useState(contact.sobrenome || '');
  const [telefone, setTelefone] = useState(contact.telefone || '');
  const [dataNascimento, setDataNascimento] = useState(
    contact.dataNascimento || '',
  );
  const [endereco, setEndereco] = useState(contact.endereco || '');
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
      !nome ||
      !sobrenome ||
      !telefone ||
      !dataNascimento ||
      !endereco ||
      !email
    ) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Email inválido!');
      return;
    }

    if (!isValidPhoneNumber(telefone)) {
      Alert.alert(
        'Erro',
        'Telefone inválido! O formato deve ser (XX) XXXXX-XXXX.',
      );
      return;
    }

    if (!isValidDate(dataNascimento)) {
      Alert.alert(
        'Erro',
        'Data de nascimento inválida! O formato deve ser DD/MM/YYYY.',
      );
      return;
    }

    try {
      const authentication = await AsyncStorage.getItem('token');
      if (contact._id) {
        // Editar contato
        await axios.put(
          `${API_URL}/contatos/${contact._id}`,
          {
            nome,
            sobrenome,
            telefone,
            dataNascimento,
            endereco,
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
        // Adicionar novo contato
        await axios.post(
          `${API_URL}/contatos`,
          {
            nome,
            sobrenome,
            telefone,
            dataNascimento,
            endereco,
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
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        textContentType="namePrefix"
      />
      <TextInput
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
        style={styles.input}
        textContentType="nameSuffix"
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '(99) 99999-9999',
        }}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '99/99/9999',
        }}
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
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
      <Button title="Salvar" onPress={handleSave} color="#144C77" />
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
