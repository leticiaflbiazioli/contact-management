import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from '../types';
import {API_URL} from '../../config';

type ContactsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Lista de contacts'
>;

interface ContactsScreenProps {
  navigation: ContactsScreenNavigationProp;
  setIsAuthenticated: (value: boolean) => void;
}

const ContactsScreen: React.FC<ContactsScreenProps> = ({
  navigation,
  setIsAuthenticated,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const authentication = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${authentication}`,
          'Content-Type': 'application/json',
        },
      });
      setContacts(response.data);
      fetchContacts();
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const authentication = await AsyncStorage.getItem('token');
      await axios.delete(`${API_URL}/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${authentication}`,
          'Content-Type': 'application/json',
        },
      });
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const renderItem = ({item}: {item: Contact}) => (
    <View style={styles.contactItem}>
      <Text>
        {item.name} {item.surname}
      </Text>
      <Button
        title="Edit contact"
        onPress={() =>
          navigation.navigate('Add or edit contact', {contact: item})
        }
        color="#FFA944"
      />
      {item._id && (
        <Button
          title="Delete contact"
          onPress={() => handleDelete(item._id!)}
          color="#359CD7"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item._id!}
      />
      <Button
        title="Add a new Contact"
        onPress={() => navigation.navigate('Add or edit contact')}
        color="#144C77"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#144C77',
    borderRadius: 5,
    gap: 10,
  },
});

export default ContactsScreen;
