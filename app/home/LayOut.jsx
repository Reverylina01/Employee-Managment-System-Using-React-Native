import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LayOut = () => {
  return (
    <View style={styles.container}>
      {/* Custom Header for the whole stack (optional) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Employee Management System</Text>
        <Text style={styles.headerSubtitle}>Manage your workforce easily</Text>
      </View>

      {/* Stack Navigator with hidden native headers */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Employees" />
        <Stack.Screen name="AddDetails" />
        <Stack.Screen name="MarkAttendance" />
        <Stack.Screen name="User" />
        <Stack.Screen name="Summary" />
        <Stack.Screen name="Attendence" />
        <Stack.Screen name="Empdetails" />
        <Stack.Screen name="Criteria" />
        <Stack.Screen name="About" />
      </Stack>

      {/* Footer or additional info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Your Company. All rights reserved.</Text>
      </View>
    </View>
  )
}

export default LayOut

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Light blueish background
    paddingTop: 40,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#4a90e2', // Nice blue header
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
    fontStyle: 'italic',
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#e1e9f8',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
})
