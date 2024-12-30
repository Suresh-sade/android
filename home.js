import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Dashboard = () => {
  const navigation = useNavigation();
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  const openFeedback = () => {
    navigation.navigate('/feedback');
  };

  const openAttendance = () => {
    navigation.navigate('Attendance');
  };

  const openProfile = () => {
    navigation.navigate('Profile');
  };

  const openCompensation = () => {
    navigation.navigate('Compensation');
  };

  const openEvents = () => {
    navigation.navigate('Events');
  };

  const openAnalysis = ()=>[
    navigation.navigate('Analysis')
  ]

  const openEmployee = () => {
    navigation.navigate('Employee');
  };

  const openLeave = () => {
    navigation.navigate('Leave');
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleCheckIn = () => {
    const currentTime = new Date();
    setCheckInTime(formatTime(currentTime));
    setIsCheckedIn(false)
  };

  // Clockout handler
  const handleCheckOut = () => {
    const currentTime = new Date();
    setCheckOutTime(formatTime(currentTime));
    setIsCheckedIn(false)
  };

  const widgets = [
    { id: 1, title: 'Taskbox', icon: <Icon name="logo-dropbox" size={40} />, onPress: openFeedback },
    { id: 2, title: 'Attendance', icon: <Icon name="calendar-outline" size={40} style={{ color: "#7076d2" }} />, onPress: openAttendance },
    { id: 3, title: 'Leave', icon: <Icon name="accessibility-outline" size={40} style={{ color: "#7076d2" }} />, onPress: openLeave },
    { id: 4, title: 'Compensation', icon: <Icon name="wallet-outline" size={40} style={{ color: "#7076d2" }} />, onPress: openCompensation },
    { id: 5, title: 'Performance', icon: <Icon name="bar-chart-outline" size={40} style={{ color: "#7076d2" }} />, onPress: openAnalysis },
    { id: 6, title: 'Feedback', icon: <Icon name="chatbox-ellipses-outline" size={40} />, onPress: openFeedback },
    { id: 7, title: 'HR Documents', icon: <Icon name="briefcase-outline" size={40} />, onPress: openFeedback },
    { id: 8, title: 'Recruitment', icon: <Icon name="globe-outline" size={40} />, onPress: openFeedback },
    { id: 9, title: 'Calendar', icon: <Icon name="calendar-number-outline" size={40} />, onPress: openFeedback },
    { id: 10, title: 'Employee', icon: <Icon name="people-outline" size={40} style={{ color: "#7076d2" }} />, onPress: openEmployee },
    { id: 11, title: 'Events', icon: <Icon name="location" size={40} style={{ color: "#7076d2" }} />, onPress: openEvents },
    { id: 12, title: 'Flows', icon: <Icon name="git-compare-outline" size={40}  />, onPress: openFeedback },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.navTop}>
          <View style={styles.navLeft}>
          <Image style={styles.logo} source={require('./assets/icon.png')} />
            <Text style={styles.navTitle}></Text>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity onPress={openProfile}>
              <Image style={styles.logo} source={require('./assets/profile.jpg')} />
            </TouchableOpacity>
            <Icon onPress={openSettings} name="help-circle-outline" size={35} style={styles.icon} />
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={24} style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Search by Employee name or Id" />
          </View>
        </View>
      </View>

      <View style={styles.clockinOutContainer}>
        <View style={styles.clockinOutItem}>
          <TouchableOpacity>
            <Text style={styles.clockinOutTitle}>
             Clockin
            </Text>
            <Text style={styles.clockinOutTitle}>
              {checkInTime}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clockinOutItem}>
          <TouchableOpacity>
            <Text style={styles.clockinOutTitle}>
             Clockout
            </Text>
            
            <Text style={styles.clockinOutTitle}>
              {checkOutTime}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkinContainer}>
      {isCheckedIn ? <TouchableOpacity style={styles.checkinBox} onPress={handleCheckIn}>
        <Text style={styles.checkinTitle}>Checkin</Text>
        <Text style={styles.checkinSubtitle}>click here to Check in</Text>
          </TouchableOpacity> : <TouchableOpacity onPress={handleCheckOut} style={styles.checkinBox}>
         <Text style={styles.checkinTitle}>Checkout</Text>
          <Text style={styles.checkinSubtitle}>click here to Check out</Text>
        </TouchableOpacity>}
      </View>

      <View style={styles.widgetsContainer}>
        <View style={styles.widgetsWrapper}>
          {widgets.map((widget) => (
            <View key={widget.id} style={styles.widgetItem}>
              <TouchableOpacity style={styles.widgetBox} onPress={widget.onPress}>
                {widget.icon}
              </TouchableOpacity>
              <Text style={styles.widgetTitle} onPress={widget.onPress}>{widget.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: 20,
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  navTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  navTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  helpIcon: {
    color: '#9ca3af',
  },
  searchContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    width: '83%',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 12,
  },
  searchIcon: {
    color: '#6b7280',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  clockinOutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  clockinOutItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#d1d5db',
  },
  clockinOutTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  checkinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkinBox: {
    width: '83%',
    height: 64,
    backgroundColor: '#4c94f7',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  checkinTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  checkinSubtitle: {
    fontSize: 12,
    color: '#fff',
  },
  widgetsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  widgetsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 28,
  },
  widgetItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetBox: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  widgetTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default Dashboard;
