import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere para o endereço da sua API
});

// Adiciona o token JWT em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Função para autenticação
export const login = async (username: string, password: string) => {
  return api.post('/auth/login', { username, password });
};

// Funções CRUD para contatos
export const getContacts = () => api.get('/contatos');
export const createContact = (contact: any) => api.post('/contatos', contact);
export const updateContact = (id: string, contact: any) => api.put(`/contatos/${id}`, contact);
export const deleteContact = (id: string) => api.delete(`/contatos/${id}`);
