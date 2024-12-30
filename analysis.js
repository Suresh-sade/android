import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Duration', 'Present Days', 'Leave Days', 'Avg Over Time'], // x-axis labels
  datasets: [
    {
      data: [5.0, 7.0, 0.0, 0.0], // corresponding y-axis data points
    },
  ],
};

const chartConfig = {
  backgroundColor: '#f1f1f1',
  backgroundGradientFrom: '#ff7e5f', // Soft gradient for the background
  backgroundGradientTo: '#feb47b', // Another soft color in gradient
  decimalPlaces: 2, // Optional: round to 2 decimal places
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for the chart bars
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Dark color for label text
  style: {
    borderRadius: 16,
    paddingTop: 20, // Added padding for a more spacious layout
    paddingBottom: 20,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726', // Custom color for the dot strokes
  },
  propsForLabels: {
    fontSize: 10, // Adjust label font size for better legibility
  },
};

export default function Analysis() {
    const navigation = useNavigation();
    
    const openHome = () => {
        navigation.navigate('Home');
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Icon onPress={openHome} size={25} name="arrow-back-outline" />
                <Text style={styles.navbarText}>Settings</Text>
            </View>
            
            <Text style={styles.title}>Performance Analysis Chart</Text>
            
            <View style={styles.chartContainer}>
                <BarChart
                    data={data}
                    width={screenWidth - 30} // Slightly smaller than screen width for spacing
                    height={350}  // Increased height to 350
                    chartConfig={chartConfig}
                    verticalLabelRotation={0} // This ensures labels are horizontal
                    style={styles.chart}
                    withHorizontalLabels={true} // Enable horizontal labels
                    withOuterLines={false} // Optional: Hide outer grid lines
                    showValuesOnTopOfBars={true} // Show values at the top of the bars
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background color for the whole screen
    padding: 20,
  },
  navbar: {
    position: 'absolute', // Position it absolutely at the top-left
    top: 20,
    left: 20,
    paddingVertical:20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarText: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 10, // Space between the icon and text
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text color for the title
    marginBottom: 30,
    textAlign: 'center',
  },
  chartContainer: {
    borderRadius: 20,
    overflow: 'hidden', // To ensure rounded corners are applied to the chart
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3, // Shadow for Android devices
    backgroundColor: '#fff', // Background for the chart
    position: 'relative', // For positioning the labels overlay
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
