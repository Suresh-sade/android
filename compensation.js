import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from "@react-navigation/native";

const Compensation = ()=>{
   const navigation = useNavigation();
  const openHome = ()=>{ 
    navigation.navigate('Home')
  }
    return(
        <View style={styles.container}>
                  <View style={styles.navbar}>
                  <Icon onPress={openHome}  size={25} name="arrow-back-outline" />
          <Text  style={{fontSize:20,fontWeight:800}}>Compensation</Text>
        </View>
        <View style={styles.card}>
            <View style={styles.heading}>
            <Image  style={styles.logo} source={require('./assets/profile.jpg')} />
            <Text style={styles.bold}>CTC Proration</Text>
            </View>
            <View style={styles.details}>
<View>
    <Text>Annual CTC</Text>
    <Text style={styles.bold}>INR 30000000/-</Text>
</View>
<View>
    <Text>Effective from</Text>
    <Text style={styles.bold}>08-10-2024</Text>
</View>
</View>
        </View>
        <View style={styles.card}>
            <View style={styles.heading}>
            <Image  style={styles.logo} source={require('./assets/profile.jpg')} />
            <Text style={styles.bold}>Flexi components</Text>
            </View>
            <View style={styles.details}>
<View>
    <Text>Children education allowance</Text>
    <Text style={styles.bold}>0</Text>
</View>
</View>
        </View>
        <View style={styles.card}>
            <View style={styles.heading}>
            <Image  style={styles.logo} source={require('./assets/profile.jpg')} />
            <Text style={styles.bold}>Tax Sheet</Text>
            </View>
            <View style={styles.details}>
<View>
    <Text>Financial year</Text>
    <Text style={styles.bold}>2024-25</Text>
</View>
</View>

        </View>
        <View style={styles.card}>
            <View style={styles.heading}>
            <Image  style={styles.logo} source={require('./assets/profile.jpg')} />
            <Text style={styles.bold}>Pay Slip</Text>
            </View>
            <View style={styles.details}>
            <View>
    <Text>Financial year</Text>
    <Text style={styles.bold}>2024-25</Text>
</View>
<View>
    <Ionicons name="calendar-outline" size={25} color="#000" />
    <Text style={styles.bold}>08-10-2024</Text>
</View>
</View>
        </View>
        <TouchableOpacity style={styles.addButton}>
        <Ionicons name="document-text-outline" size={20} color="#fff" />
      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
    padding:20,
    display:'flex',
    flexDirection:'column',
    gap:20,
    backgroundColor:'#fff'
    },
    heading:{
      display:'flex',
      flexDirection:'row',
      gap:8,
      alignItems:'center'
    },
    logo:{
      width:40,
      height:40,
      borderRadius:100
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FC7941',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Adds shadow for Android
        zIndex: 100,   // Ensures the button is above all other content
      },
      addButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
      },
    details:{
      width:200,
      display:'flex',
      flexDirection:'row',
      gap:40
    },
    bold:{
      fontWeight:800,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f4f4f4",
      gap:10
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      paddingBottom: 12,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "600",
      marginLeft: 16,
    },
    logo:{
      width:40,
      height:40,
      borderRadius:100
    },
    navbar:{
      marginTop:20,
      padding:20,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:12
      },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    optionText: {
      fontSize: 16,
    },
    icon: {
      marginLeft: 8,
    },
  });

export default Compensation;