import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function ContactItem({contact, onDelete, onEdit}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {contact.nome} {contact.sobrenome}
      </Text>
      <Text style={styles.text}>{contact.telefone}</Text>
      <Text style={styles.text}>{contact.email}</Text>
      <Button title="Editar" onPress={onEdit} color="#000080" />
      <Button title="Excluir" onPress={onDelete} color="#FF4500" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});
