import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

const Criteria = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Attendance Policy</Text>

      <View style={styles.section}>
        <MaterialIcons name="schedule" size={28} color="#2980b9" />
        <Text style={styles.heading}>Working Hours</Text>
        <Text style={styles.text}>
          Employees are expected to work from 9:00 AM to 6:00 PM, Monday to
          Friday. A one-hour lunch break is included in the schedule.
        </Text>
      </View>

      <View style={styles.section}>
        <FontAwesome5 name="calendar-check" size={28} color="#27ae60" />
        <Text style={styles.heading}>Attendance Requirement</Text>
        <Text style={styles.text}>
          A minimum of 90% attendance per month is mandatory. Regular attendance
          is crucial for performance evaluation, promotions, and appraisals.
        </Text>
      </View>

      <View style={styles.section}>
        <Entypo name="clock" size={28} color="#f39c12" />
        <Text style={styles.heading}>Late Arrival</Text>
        <Text style={styles.text}>
          Employees arriving after 9:30 AM will be marked late. Three late
          arrivals in a month will lead to a formal warning.
        </Text>
      </View>

      <View style={styles.section}>
        <FontAwesome5 name="user-clock" size={28} color="#e67e22" />
        <Text style={styles.heading}>Leave Policy</Text>
        <Text style={styles.text}>
          Leaves must be applied at least one day in advance. Emergency leave
          should be informed to HR or reporting manager on the same day.
        </Text>
      </View>

      <View style={styles.section}>
        <MaterialIcons name="event-busy" size={28} color="#e74c3c" />
        <Text style={styles.heading}>Uninformed Absence</Text>
        <Text style={styles.text}>
          Uninformed absence for more than one day will result in disciplinary
          action. Consistent absenteeism can lead to salary deductions or
          termination.
        </Text>
      </View>

      <View style={styles.section}>
        <FontAwesome5 name="gavel" size={28} color="#8e44ad" />
        <Text style={styles.heading}>Disciplinary Action</Text>
        <Text style={styles.text}>
          Repeated policy violations may result in a warning letter, suspension,
          or termination based on HR evaluation.
        </Text>
      </View>

      <Text style={styles.footer}>Maintain Discipline. Ensure Productivity.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#34495e",
  },
  text: {
    fontSize: 15,
    color: "#7f8c8d",
    marginTop: 6,
  },
  footer: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#2980b9",
  },
});

export default Criteria;
