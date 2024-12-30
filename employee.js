import React,{useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"; // Assuming you're using react-navigation
import Icon from 'react-native-vector-icons/Ionicons';

const Employee = () => {
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
              <View style={styles.navbar}>
        <Icon onPress={openHome} size={25} name="arrow-back-outline" />
          <Text style={{fontSize:20,fontWeight:800}}>Employee</Text>
        </View>
      {/* Sticky Header */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
    <View style={styles.tabdetails}>
    <Image source={require('./assets/employee.jpg')} style={styles.profileImage} />
    <View style={{display:'flex',flexDirection:'column',gap:4,width:'80%',alignItems:'center',justifyContent:'center'}}>
    <Text style={{ textAlign: 'center',fontSize:20,fontWeight:800 }}>Search for colleagues</Text>
    <Text style={{ textAlign: 'center',color:'gray' }}>Search for the employee details based on the Employee ID or Name</Text>
    </View>
     <View style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity style={{padding:10,borderRadius:5,backgroundColor:'#FC7941'}}><Text style={{color:'#fff',fontWeight:800}}>Search</Text></TouchableOpacity>
     </View>
    </View>
      </ScrollView>
    </View>
  );
};

const ProfileDetail = ({ label, value }) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
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
  tab:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  width:200,
  height:40,
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
   borderBottomColor:'#FC7941'
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
  sectionTitle: {
    fontWeight: "600",
    color: "#FC7941",
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
  navbar:{
    marginTop:20,
    padding:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:12
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

export default Employee;
