import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactsScreen from './src/screens/ContactsScreen';
import AddEditContactScreen from './src/screens/AddEditContactScreen';
import LoginScreen from './src/screens/LoginScreen';
import {Contact} from './src/types';

export type RootStackParamList = {
  Login: undefined;
  'Lista de contatos': undefined;
  'Adicionar ou editar contato': {contact?: Contact} | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Lista de contatos">
              {props => (
                <ContactsScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Adicionar ou editar contato">
              {props => (
                <AddEditContactScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => (
              <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
