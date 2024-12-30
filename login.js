import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet, Modal, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [mobilenumber, setMobilenumber] = useState('');
  const [ismobileFocused, setIsMobileFocused] = useState(false);
  const [ispassFocused, setIsPassFocused] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const navigation = useNavigation();
  const [user,setUser] = useState({ email: '', password:''});
  const [error,setError] = useState('')

  const navigateToAmountReceivedScreen = (phoneNumber) => {
    navigation.navigate('AmountReceived', { phoneNumber });
  };

  const saveToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };
  
   const fetchUserdata = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();

          console.error('Invalid data format:', data);
          return null;
      }
       else {
        console.error('Failed to fetch user profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const goToSignup = () => {
    if (navigation) {
      navigation.navigate('Home');  // Correct usage of navigation
    }
  };
  const handleChange = (field, value) => {
    setError('');
    setUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const fetchuser = async () => {
    const token = localStorage.getItem('token');
    const userProfile = await fetchUserProfile();
    try {
      const response = await fetch(`http://localhost:8080/api/users/getBy-email?email=${userProfile.email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setuserId(data.userid)
        console.log(data.userid)
        return data;
      }
       else {
        console.error('Failed to fetch user profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/auth/adminuser/get-profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          // Check if `ourUsers` exists in the response
          if (data.statusCode === 200 && data.ourUsers) {
            return data.ourUsers; // Return `ourUsers` object
          } else {
            console.error('Invalid data format:', data);
            return null;
          }
        } else {
          console.error('Failed to fetch user profile:', response.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    };

  const handleForgotPassword = () => {
    setShowForgotPasswordPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // const payload={
    //   email: user.email,
    //   password: encryptData(user.password)
    // }
    // Validate user input
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (user.password.length < 8) {
 
      return;
    }
    if (!user.email) {

      return;
    } else if (!emailPattern.test(user.email)) {

      return;
    }

    try {
      // const token = process.env.REACT_APP_GITHUB_TOKEN;
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(user),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          setUser({ email: '', password: '' });
          console.log('Form data submitted successfully');
          const userProfile = await fetchUserProfile(data.token);
          const userdetails = await fetchUserdata();
          const fetchedUser = await fetchuser(); // Await fetchuser

          // const userIdAsciiInt = stringToAsciiInt(userProfile.id).asciiAsInt
          if (userdetails?.some(user => user.email === userProfile.email)) {
            saveToken('Token',data.token)
             navigation.navigate('Signup')
             dispatch(setAuth({ userId: fetchedUser.id, token: data.token }));
            console.log(userProfile.id);
            console.log(fetchedUser.id);
            setError('');
          } else if (userProfile) {
            // dispatch(setAuth({ userId: user.id, token: data.token }));
            console.log('Navigating to /profiledetails');

            setTimeout(() =>  navigation.navigate('Signup'), 5000);
            console.log(userProfile.id);
            setError('');
          }
        } else {
            setError('Invalid credentials. Please try again.');
        }
      } else {
        setError('Incorrect Username/Password');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

    }
  };

  return (
    <View style={{ flex: 1}}>
         <Svg height="100%" width="100%" style={styles.gradient}>
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3AB4BC" stopOpacity="1" />
            <Stop offset="100%" stopColor="#5CBE8F" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
      </Svg>
    <ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 35}}>
    <Image
        source={require('./assets/logo.png')}  // Replace with your image path
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <View style={{gap:5}}>
      <View style={{ gap: 10 }}>
      <Text style={{fontWeight:500}}>Email</Text>
      <TextInput
        style={[styles.input, ismobileFocused && styles.focusedInput]}
        onChangeText={(value) => handleChange('email', value)}
        value={user.email}
        placeholder="Enter your email"
        keyboardType="email-address"
        required
        onFocus={() => setIsMobileFocused(true)}
        onBlur={() => setIsMobileFocused(false)}
      />
      <Text style={{fontWeight:500}}>Password</Text>
      <TextInput
        style={[styles.input, ismobileFocused && styles.focusedInput]}
        onChangeText={(value) => handleChange('password', value)}
        value={user.password}
        placeholder="Enter your password"
        secureTextEntry 
        required
        onFocus={() => setIsPassFocused(true)}
        onBlur={() => setIsPassFocused(false)}
      />
       </View>
        <TouchableOpacity  onPress={()=>navigateToAmountReceivedScreen(mobilenumber)} style={{ alignItems: 'flex-end' }}>
          <Text style={{  fontSize: 12, textDecorationLine: 'underline', cursor: 'pointer' }}>
            Forgot password
          </Text>
        </TouchableOpacity>
        </View>
        <View style={{display:'flex',flexDirection:'column',gap:'10'}}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={{color: '#fff', }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 12, cursor: 'pointer' }}>
          I am a new member <Text onPress={goToSignup} style={{fontWeight:'500'}}>Sign Up Here</Text>
          </Text>
        </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showForgotPasswordPopup} transparent={true} animationType="fade" onRequestClose={() => setShowForgotPasswordPopup(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.forgotPasswordPopup}>
            <View style={{display:'flex',flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
            <Text style={{fontWeight:800}}>OTP</Text>
            <Icon onPress={handleForgotPassword}  name='close' size={35} />
            </View>
            <TextInput style={styles.forgotinput} placeholder="OTP" keyboardType="numeric" onChangeText={(text) => {/* handle input change */}}/>

          </View>
        </View>
      </Modal>
      </ImageBackground>
    </View>

  );
};

const styles = StyleSheet.create({
  inputFocused: {
    borderColor: '#1F41BB',
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 10, // Equivalent to 'px-2'
    paddingVertical: 10,   // Equivalent to 'py-2'
    fontSize: 14,          // Equivalent to 'text-sm'
    borderWidth: 1,        // Equivalent to 'border'
    borderColor: '#D1D5DB', // Equivalent to 'border-gray-400'
    borderRadius: 4,       // Equivalent to 'rounded-md'
    backgroundColor: '#fff',
  },
  image:{
    height:50,
    width:'60%'
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Ensures gradient is behind other content
  },
  button: { // To stack the gradient background and text
 
    padding:10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3AB4BC',
    zIndex: 2, 
    color:'#fff' // Ensures button is on top of the gradient
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height:10
  },
  forgotinput: {
    width:'80%',
    height: 40,
    border: 'none',
    backgroundColor: '#F3F6FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotbutton: {
    backgroundColor: '#1F41BB',
    width: '60%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },  
  inputContainer: {
    display:'flex',
    flexDirection:'column',
    height:320,
    justifyContent: 'center',
    gap:'30',
    borderRadius: 5, 
    width:'85%',
    backgroundColor: '#fff',
    paddingHorizontal:20
  },
  forgotPasswordPopup: {
    width:'85%',
    backgroundColor: '#fff',
    padding: 20,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    gap:20,
    borderRadius: 10,
  },
});

export default LoginScreen;
