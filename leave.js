import React,{useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you're using vector icons

const Leave = () => {
    const navigation = useNavigation();
  
    const [activeTab, setActiveTab] = useState('My Team');  // Track active state
  
    const handleTabPress = (tab) => {
      setActiveTab(tab);  // Change the active tab when pressed
    };

    const openHome = ()=>{
      navigation.navigate('Home')
    }
    return (
      <View style={styles.container}>
        {/* Sticky Header */}
        <View style={styles.navbar}>
        <Icon onPress={openHome}  size={25} name="arrow-back-outline" />
          <Text style={{fontSize:20,fontWeight:800}}>Leave</Text>
        </View>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => handleTabPress('My Team')} style={[styles.tab, activeTab === 'My Team' && styles.activeText]} >
          <Text style={[styles.sectionTitle , activeTab === 'My Team' && styles.activeTexts]}>
          Leave Balance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'My Org' && styles.activeText]}  onPress={() => handleTabPress('My Org')}>
          <Text style={[styles.sectionTitle, , activeTab === 'My Org' && styles.activeTexts]}>
          List of holidays
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'My Org' && styles.activeText]}  onPress={() => handleTabPress('My Org')}>
          <Text style={[styles.sectionTitle, , activeTab === 'My Org' && styles.activeTexts]}>
         Comp off
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'column',gap:10,padding:20}}>
      <View style={styles.card}>
            <View style={styles.heading}>
            <Text style={styles.bold}>Birthday Leave</Text>
            <Icon name="chevron-forward" size={16} style={styles.icon} />

            </View>
            <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
    <Text style={{fontSize:40,fontWeight:800}}>1.0</Text>
    <Text>Currently Available</Text>
</View>
            <View style={styles.details}>
<View style={{flexDirection:'row',gap:20}}>
    <Text style={styles.bold}>0.0</Text>
    <Text>Credited from last year/-</Text>
</View>
<View style={{flexDirection:'row',gap:20}}>
    <Text style={styles.bold}>0.0</Text>
    <Text>Annual Allotment</Text>
</View>
</View>
        </View>
        <View style={styles.card}>
            <View style={styles.heading}>
            <Text style={styles.bold}>Birthday Leave</Text>
            <Icon name="chevron-forward" size={16} style={styles.icon} />
            </View>
            <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
    <Text style={{fontSize:40,fontWeight:800}}>1.0</Text>
    <Text>Currently Available</Text>
</View>
            <View style={styles.details}>
<View style={{flexDirection:'row',gap:20}}>
    <Text style={styles.bold}>0.0</Text>
    <Text>Credited from last year/-</Text>
</View>
<View style={{flexDirection:'row',gap:20}}>
    <Text style={styles.bold}>0.0</Text>
    <Text>Annual Allotment</Text>
</View>
</View>
        </View>
        <View style={styles.card}>
            <View style={styles.heading}>
            <Text style={styles.bold}>Birthday Leave</Text>
            <Icon name="chevron-forward" size={16} style={styles.icon} />
            </View>
            <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
    <Text style={{fontSize:40,fontWeight:800}}>1.0</Text>
    <Text>Currently Available</Text>
</View>
            <View style={styles.details}>
<View style={{flexDirection:'row',gap:20}}>
    <Text style={styles.bold}>0.0</Text>
    <Text>Credited from last year/-</Text>
</View>
<View style={{flexDirection:'row',gap:20}}>
    <Text style={styles.bold}>0.0</Text>
    <Text>Annual Allotment</Text>
</View>
</View>
        </View>

      </View>
        </ScrollView>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,  },
    scrollContainer: {
      flex: 1,
      // Make space for the sticky header
    },
    contentContainer: {
     // Ensure space for sign-out button at the bottom of the screen
    },  
    option: {
      flexDirection: "column",
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    optionText: {
      fontSize: 16,
    },
    icon: {
      marginLeft: 8,
    },
    details:{
        width:200,
        display:'flex',
        flexDirection:'column',
        gap:10
      },
    tab:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:130,
    height:40,
    },
    logo:{
        width:40,
        height:40,
        borderRadius:100
      },
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
          justifyContent:'space-between',
          gap:8,
          alignItems:'center'
        },
    buttonContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:100
    },
    navbar:{
    marginTop:20,
    padding:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:12
    },
    bold:{
        fontWeight:800,
        fontSize:28,
        width:80,
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
    button:{
    width:'50%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:11,
    borderRadius:5,
    backgroundColor:'#FC7941'
    },
    leaveContainer:{
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap',
     gap:4
    },
    bold:{
    fontWeight:800,
    fontSize:14
    },
    leavebox:{
     padding:10,
     width:'46%',
     display:'flex',
     flexDirection:'column',
     alignItems:'center',
    },
    joineeContainer:{
     display:'flex',
     flexDirection:'column',
     alignItems:'flex-end',
     color:'#fff'
    },
    headerContainer:{
     display:'flex',
     flexDirection:'row',
     alignItems:'center',
     width:'100%',
     justifyContent:'space-between'
    },
    activeTexts:{
      color:'#FC7941'
    },
    tabdetails:{
      flex:1,
      gap:20,
      alignItems:'center',
      justifyContent:'center',
      height:500
    },
    header: {
      position: "absolute", // Keeps the header fixed at the top
      top: 0,
      left: 0,
      right: 0,
      gap:20,
      backgroundColor: "#FC7941", // Header background color
      padding: 10,
      zIndex: 10, // Ensures the header stays on top of the content
    },
    headerContent: {
      flexDirection: "row",
      justifyContent:'flex-end',
      width: "100%",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileInfo: {
      alignItems: "center",
      marginTop: 8,
    },
    dateContainer: {
      display:'flex',
      flexDirection:'row',
      gap:4,
      alignItems:'center',
      width:100,
      color:'#fff'
    },
    profileImage: {
      width: 96,
      height: 96,
      borderRadius: 100,
    },
    activeText:{
     borderBottomWidth:3,
     borderBottomColor:'#FC7941',
     color:'#fff'
    },
    profileName: {
      marginTop: 8,
      fontWeight: "600",
      color: "#fff",
    },
  
    sectionTitle: {
      fontSize: 14,
      paddingHorizontal: 10,
    },
    sectionHeader: {
      display:'flex',
      flexDirection:'row',
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      height: 48,// Header highlight color
    },
    detailContainer: {
      flexDirection: "column",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    detailLabel: {
      fontSize: 12,
      color: "#A0A0A0",
    },
    detailValue: {
      fontSize: 14,
      fontWeight: "600",
    },
    viewSeparation: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    viewSeparationText: {
      fontSize: 14,
      color: "#FC7941",
    },
    signOutButtonContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 70,
    },
    signOutButton: {
      backgroundColor: "#FC7941",
      paddingVertical: 10,
      paddingHorizontal: 32,
      borderRadius: 8,
    },
    signOutButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  export default Leave;