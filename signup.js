import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet, Modal, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import tailwind from 'tailwind-rn';
import DropDownPicker from 'react-native-dropdown-picker';


const SignupScreen = () => {
    const [mobilenumber, setMobilenumber] = useState('');
    const [ismobileFocused, setIsMobileFocused] = useState(false);
    const [ispassFocused, setIsPassFocused] = useState(false);
    const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
    const navigation = useNavigation();
    const [user,setUser] = useState({name:'', email: '', phonenumber:'', password:'',confirmpassword:''});
    const [error,setError] = useState('')
    const[country,SetCountry] = useState(null);
    // const handleLogin = () => {
    //     navigation.navigate('Home');
    //     setShowForgotPasswordPopup(false);
    // };
  
    // const openAdmin = ()=>{
    //   navigation.navigate('Admin')
    // }
  
    const handleShowLanguages = ()=>{
      setLanguages(!languages);
  }

    const goToSignup = () => {
      if (navigation) {
        navigation.navigate('Login');  // Correct usage of navigation
      }
    };
    const handleSelectPhoneCode = (code)=>{
      SetCountry(code);
      showPhoneCode(false);
  }
    const handleChange = (field, value) => {
      setError('');
      setUser((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
    const sendOtp = ()=>{
      mobilenumber.length === 10?(setShowForgotPasswordPopup(true)):''
    }
  
    const handleForgotPassword = () => {
      setShowForgotPasswordPopup(false);
    };
    const handleShowPhoneCode = ()=>{
      showPhoneCode(!phoneCode);
    }

  
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
            if (userdetails.some(user => user.email === userProfile.email)) {
              dispatch(setAuth({ userId: fetchedUser.id, token: data.token }));
              setTimeout(() => navigate('/newsfeed'), 5000);
  
              console.log(userProfile.id);
              setError('');
            } else if (userProfile) {
              // dispatch(setAuth({ userId: user.id, token: data.token }));
              console.log('Navigating to /profiledetails');
  
              setTimeout(() => navigate('/profiledetails'), 5000);
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
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'js' },
    { label: 'Python', value: 'python' },
    { label: 'C++', value: 'cpp' },
  ]);
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
      <ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15}}>
      <Image
          source={require('./assets/logo.png')}  // Replace with your image path
          style={styles.image}
        />
        <View style={styles.inputContainer}>
          <View style={{gap:5}}>
        <View style={{ gap: 10 }}>
        <Text style={{fontWeight:500}}>Username</Text>
        <TextInput
          style={[styles.input, ismobileFocused && styles.focusedInput]}
          onChangeText={(value) => handleChange('name', value)}
          value={user.name}
          placeholder="Enter your username"
          keyboardType="default"
          required
          onFocus={() => setIsMobileFocused(true)}
          onBlur={() => setIsMobileFocused(false)}
        />
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
                        <Text style={{fontWeight:500}}>Phonenumber</Text>
<View style={{display:'flex',flexDirection:'row',      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,}}>
        
<TextInput
    style={{
      height: 40,
      width: '70%', // 70% width for the input field
      paddingHorizontal: 8,
    }}
    onChangeText={(value) => handleChange('phonenumber', value)}
    value={user.phonenumber}
    placeholder="Enter your phonenumber"
    keyboardType="phone-pad"
    required
    onFocus={() => setIsMobileFocused(true)}
    onBlur={() => setIsMobileFocused(false)}
  />
    {/* <DropDownPicker
    style={{
      borderWidth: 1,
      borderRadius: 8,
      height:50,
      width:80, // 30% width for the dropdown

      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
  /> */}
</View>

                    <Text style={{fontWeight:500}}>Password</Text>
              <TextInput
          style={[styles.input, ismobileFocused && styles.focusedInput]}
          onChangeText={(value) => handleChange('password', value)}
          value={user.password}
          placeholder="Enter your password"
        //   keyboardType='visible-password'
          secureTextEntry 
          required
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
        />
                <Text style={{fontWeight:500}}>Confirm Password</Text>
        <TextInput
          style={[styles.input, ismobileFocused && styles.focusedInput]}
          onChangeText={(value) => handleChange('confirmpassword', value)}
          value={user.confirmpassword}
          placeholder="Enter your confirmpassword"
          keyboardType=""
          secureTextEntry 
          required
          onFocus={() => setIsMobileFocused(true)}
          onBlur={() => setIsMobileFocused(false)}
        />
         </View>
          </View>
          <View style={{display:'flex',flexDirection:'column',gap:'10'}}>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{color: '#fff', }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 12, cursor: 'pointer' }}>
            Already a member <Text onPress={goToSignup} style={{fontWeight:'500'}}>Log in Here</Text>
            </Text>
          </TouchableOpacity>
          </View>
          {error}
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

export default SignupScreen;

const styles = StyleSheet.create({
    inputFocused: {
      borderColor: '#3AB4BC',
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
      height:540,
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
    mobileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:1
    }
  });
  