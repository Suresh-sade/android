import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you're using vector icons

const Settings = () => {
  const navigation = useNavigation();
  const [isDarwinProtectEnabled, setIsDarwinProtectEnabled] = React.useState(false);

  const toggleDarwinProtect = () => setIsDarwinProtectEnabled(previousState => !previousState);

  
  const openHome = ()=>{
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
        <View style={styles.navbar}>
        <Icon onPress={openHome} size={25} name="arrow-back-outline" />
          <Text style={{fontSize:20,fontWeight:800}}>Settings</Text>
        </View>
      {/* Header Section */}

      {/* Privacy Policy Sections */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Privacy Policy</Text>
        <Icon name="chevron-forward" size={16} style={styles.icon} />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Terms of Use</Text>
        <Icon name="chevron-forward" size={16} style={styles.icon} />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Change Password</Text>
        <Icon name="chevron-forward" size={16} style={styles.icon} />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Vibe Notifications Settings</Text>
        <Icon name="chevron-forward" size={16} style={styles.icon} />
      </View>

      {/* Darwin Protect Option */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Enable Darwin Protect</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FC7941" }}
          thumbColor={isDarwinProtectEnabled ? "#fff" : "#f4f3f4"}
          onValueChange={toggleDarwinProtect}
          value={isDarwinProtectEnabled}
 
          style={{
            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] // Decrease size by 20%
          }}
        />
      </View>
    </View>
  );
};

// Styles for React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  navbar:{
    marginTop:20,
    paddingVertical:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:12
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

export default Settings;
