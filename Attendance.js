import React,{useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"; // Assuming you're using react-navigation
import Icon from 'react-native-vector-icons/Ionicons';

const Attendance = () => {
  const navigation = useNavigation();

  const openSettings = ()=>{
    navigation.navigate('Settings')
  }

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
        <Icon onPress={openHome} size={25} name="arrow-back-outline" />
          <Text style={{fontSize:20,fontWeight:800}}>Attendance</Text>
        </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={() => handleTabPress('My Team')} style={[styles.tab, activeTab === 'My Team' && styles.activeText]} >
        <Text style={[styles.sectionTitle , activeTab === 'My Team' && styles.activeTexts]}>
        Summary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, activeTab === 'My Org' && styles.activeText]}  onPress={() => handleTabPress('My Org')}>
        <Text style={[styles.sectionTitle, , activeTab === 'My Org' && styles.activeTexts]}>
          Check In
        </Text>
      </TouchableOpacity>
    </View>
         <View style={styles.leaveContainer}>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            0.0
         </Text>
         <Text>
         Leave Days
         </Text>
         </View>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            0
         </Text>
         <Text>
        Unpaid Leave Days
         </Text>
         </View>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            7.0
         </Text>
         <Text>
         Present Days
         </Text>
         </View>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            0.0
         </Text>
         <Text>
         Absent Days
         </Text>
         </View>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            09.30
         </Text>
         <Text>
         Avg. work Duration
         </Text>
         </View>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            0.0
         </Text>
         <Text>
         Avg. Late by
         </Text>
         </View>
         <View style={styles.leavebox}>
         <Text style={styles.bold}>
            0.0
         </Text>
         <Text>
        Avg. Overtime
         </Text>
         </View>

         </View>
         <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}><Text style={{color:'#fff',fontWeight:800,fontSize:16}}>Attendance view</Text></TouchableOpacity>
         </View>
         <View style>
         <View style={styles.option}>
        <Text style={{fontSize:14,fontWeight:800}}>Clock in Priority</Text>
        <Text>Biometric</Text>
        </View>
        <View style={styles.option}>
        <Text style={{fontSize:14,fontWeight:800}}>Shift</Text>
        <Text>Flexi Shift</Text>
        <Text>09:30 - 18:30</Text>
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
  },  option: {
    flexDirection: "column",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  navbar:{
    marginTop:20,
    padding:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:12
    },
  icon: {
    marginLeft: 8,
  },
  tab:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  width:200,
  height:40,
  },
  buttonContainer:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:100
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
fontSize:28
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
    fontSize: 18,
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

export default Attendance;
