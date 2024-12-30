import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-ionicons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"; // Assuming you're using react-navigation


const Profile = () => {
  const navigation = useNavigation();

  const openSettings = ()=>{
    navigation.navigate('Settings')
  }

  
  const openHome = ()=>{
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
              <View style={styles.navbar}>
        <Icon onPress={openHome}  size={25} name="arrow-back-outline" />
          <Text style={{fontSize:20,fontWeight:800}}>Profile</Text>
        </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
        </View>

        {/* Profile Details */}
        <ProfileDetail label="Business unit" value="Solutions" />
        <ProfileDetail label="Company" value="Intelliswift software (India) Private Company" />
        <ProfileDetail label="Current Experience from DDJ" value="0Y 1M 25D" />
        <ProfileDetail label="Date of Joining" value="08-Oct-2024" />
        <ProfileDetail label="Department" value="Digital Product Engineering" />
        <ProfileDetail label="Email" value="suresh.ramasamy@intelliswift.com" />
        <ProfileDetail label="HOD" value="Syamlal (71405)" />
        <ProfileDetail label="Past Work Experience" value="09Y 09M 30D" />
        <ProfileDetail label="View Experience" value="09Y 11M 30D" />

        {/* View Separation Button */}
        <TouchableOpacity style={styles.viewSeparation}>
          <Text style={styles.viewSeparationText}>View Separation</Text>
          <Icon icon="ooui:next-ltr" width={12} height={12} />
        </TouchableOpacity>

        {/* Ensure the button is at the bottom */}
        <View style={styles.signOutButtonContainer}>
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon icon="material-symbols:arrow-back" width={24} height={24} />
            </TouchableOpacity>
            <Icon icon="proicons:home" width={24} height={24} />
          </View>
          <Ionicons onPress={openSettings} name="settings-outline" size={25} color="#fff" />
        </View>
        <View style={styles.profileInfo}>
          <Image source={require('./assets/profile.jpg')} style={styles.profileImage} />
          <Text style={styles.profileName}>Thomas Muller</Text>
        </View>
      </View>
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
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 150, // Make space for the sticky header
  },
  contentContainer: {
    paddingBottom: 100, // Ensure space for sign-out button at the bottom of the screen
  },
  header: {
    position: "absolute", // Keeps the header fixed at the top
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FC7941", // Header background color
    padding: 20,
    zIndex: 10, // Ensures the header stays on top of the content
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  profileName: {
    marginTop: 8,
    fontWeight: "600",
    color: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: "#FC7941", // Header highlight color
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
  navbar:{
    marginTop:20,
    padding:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:12
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

export default Profile;
