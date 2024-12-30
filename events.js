import React,{useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"; // Assuming you're using react-navigation
import Icon from 'react-native-vector-icons/Ionicons';

const Events = () => {
  const navigation = useNavigation();

  const openSettings = ()=>{
    navigation.navigate('Settings')
  }

  
  const openHome = ()=>{
    navigation.navigate('Home')
  }

  const [activeTab, setActiveTab] = useState('My Team');  // Track active state

  const handleTabPress = (tab) => {
    setActiveTab(tab);  // Change the active tab when pressed
  };
  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      {/* <View style={styles.navbar}>
        <Icon onPress={openHome} size={25} name="arrow-back-outline" />
          <Text style={{fontSize:20,fontWeight:800}}>Events</Text>
        </View> */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
           <Text style={{color:'#fff'}}>View upcoming Events</Text>
        </View>
        <View style={styles.headerContainer}>
            <View style={styles.dateContainer}>
            <View>
                <Text style={{color:'#fff',fontSize:16,fontWeight:800}}>
                    03 Dec 2024
                </Text>
                <Text style={{color:'#fff'}}>
                Tuesday
                </Text>
            </View>
            <Ionicons style={{color:'#fff'}} name="caret-down-outline" />
            </View>
            <View style={styles.joineeContainer}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',color:'#fff'}}>
                    <Text style={{color:'#fff'}}>0</Text>
                    <Icon style={{color:'#fff'}} name="chevron-forward" size={12} />
                </View>
      
                <Text style={{color:'#fff'}}>Today's Joinees</Text>
        
       
            </View>
        </View>
        {/* <View style={styles.profileInfo}>
          <Image source={require('./assets/profile.jpg')} style={styles.profileImage} />
          <Text style={styles.profileName}>Thomas Muller</Text>
        </View> */}
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={() => handleTabPress('My Team')} style={[styles.tab, activeTab === 'My Team' && styles.activeText]} >
        <Text style={[styles.sectionTitle]}>
          My Team
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, activeTab === 'My Org' && styles.activeText]}  onPress={() => handleTabPress('My Org')}>
        <Text style={[styles.sectionTitle]}>
          My Org
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.tabdetails}>
    <Image source={require('./assets/event.png')} style={styles.profileImage} />
    <Text>Seems like there is no new Joinees</Text>
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
    paddingTop: 100, // Make space for the sticky header
  },
  contentContainer: {
    paddingBottom: 100, // Ensure space for sign-out button at the bottom of the screen
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
  viewSeparationText: {
    fontSize: 14,
    color: "#FC7941",
  },
  signOutButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },
  navbar:{
    marginTop:20,
    padding:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:12
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

export default Events;
