import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import LoginScreen from './login';
import SignupScreen from './signup';
import Navbar from './navbar';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './home';
import Profile from './profile';
import Settings from './settings';
import Events from './events';
import Attendance from './Attendance';
import Compensation from './compensation';
import Employee from './employee';
import Leave from './leave';
import Analysis from './analysis';

export default function App() {
  const Stack = createStackNavigator();
  enableScreens();
  return (
    <Provider store={store}>
<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
{/* <Stack.Screen name='Login' component={LoginScreen} />
<Stack.Screen name='Signup' component={SignupScreen} /> */}
{/* <Stack.Screen name='Navbar' component={Navbar} /> */}
<Stack.Screen name='Home' component={Dashboard} />
<Stack.Screen name='Profile' component={Profile} />
<Stack.Screen name='Settings' component={Settings} />
<Stack.Screen name='Events' component={Events} />
<Stack.Screen name='Attendance' component={Attendance} />
<Stack.Screen name='Employee' component={Employee} />
<Stack.Screen name='Compensation' component={Compensation} />
<Stack.Screen name='Leave' component={Leave} />
<Stack.Screen name='Analysis' component={Analysis} />
</Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}
