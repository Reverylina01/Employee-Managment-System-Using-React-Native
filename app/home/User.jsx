import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

const User = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [currentDate, setCurrentDate] = useState(moment());
  const [advanceLoans, setAdvanceLoans] = useState("");
  const [extraBonus, setExtraBonus] = useState("");
  const [loading, setLoading] = useState(false);

  const goToNextDay = () => {
    setCurrentDate((prev) => moment(prev).add(1, "days"));
  };

  const goToPrevDay = () => {
    setCurrentDate((prev) => moment(prev).subtract(1, "days"));
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const submitAttendance = async () => {
    // Optional: validation example for numeric input
    if (advanceLoans && isNaN(Number(advanceLoans))) {
      Alert.alert("Error", "Advance / Loans must be a valid number");
      return;
    }
    if (extraBonus && isNaN(Number(extraBonus))) {
      Alert.alert("Error", "Extra Bonus must be a valid number");
      return;
    }

    setLoading(true);
    try {
      const attendanceData = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: currentDate.format("MMMM D, YYYY"),
        status: attendanceStatus,
        advanceLoans: advanceLoans || "0",
        extraBonus: extraBonus || "0",
      };
      const response = await axios.post(
        "http://192.168.2.163:8080/attendances",
        attendanceData
      );

      if (response.status === 200) {
        Alert.alert("Success", `Attendance submitted successfully for ${params?.name}`);
        // Reset inputs or leave as is based on UX
        setAdvanceLoans("");
        setExtraBonus("");
      } else {
        Alert.alert("Error", "Failed to submit attendance");
      }
    } catch (error) {
      console.log("error submitting attendance", error);
      Alert.alert("Error", "An error occurred while submitting attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateNav}>
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>

      <Pressable style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{params?.name?.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{params?.name}</Text>
          <Text style={styles.userDetails}>
            {params?.designation} ({params?.id})
          </Text>
        </View>
      </Pressable>

      <Text style={styles.basicPay}>Basic Pay : {params?.salary}</Text>

      <View style={styles.attendanceSection}>
        <Text style={styles.attendanceTitle}>ATTENDANCE</Text>

        <View style={styles.attendanceRow}>
          <Pressable
            onPress={() => setAttendanceStatus("present")}
            style={[styles.attendanceButton, attendanceStatus === "present" && styles.attendanceSelected]}
          >
            {attendanceStatus === "present" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Present</Text>
          </Pressable>

          <Pressable
            onPress={() => setAttendanceStatus("absent")}
            style={[styles.attendanceButton, attendanceStatus === "absent" && styles.attendanceSelected]}
          >
            {attendanceStatus === "absent" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Absent</Text>
          </Pressable>
        </View>

        <View style={styles.attendanceRow}>
          <Pressable
            onPress={() => setAttendanceStatus("halfday")}
            style={[styles.attendanceButton, attendanceStatus === "halfday" && styles.attendanceSelected]}
          >
            {attendanceStatus === "halfday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Half Day</Text>
          </Pressable>

          <Pressable
            onPress={() => setAttendanceStatus("holiday")}
            style={[styles.attendanceButton, attendanceStatus === "holiday" && styles.attendanceSelected]}
          >
            {attendanceStatus === "holiday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Holiday</Text>
          </Pressable>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Advance / Loans"
            placeholderTextColor="black"
            value={advanceLoans}
            onChangeText={setAdvanceLoans}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Extra Bonus"
            placeholderTextColor="black"
            value={extraBonus}
            onChangeText={setExtraBonus}
            keyboardType="numeric"
          />
        </View>

        <Pressable
          onPress={submitAttendance}
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Attendance</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dateNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
  userInfo: {
    marginVertical: 10,
    marginHorizontal: 12,
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userDetails: {
    marginTop: 5,
    color: "gray",
  },
  basicPay: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  attendanceSection: {
    marginHorizontal: 12,
  },
  attendanceTitle: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 3,
    marginTop: 7,
  },
  attendanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 10,
  },
  attendanceButton: {
    backgroundColor: "#C4E0E5",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  attendanceSelected: {
    backgroundColor: "#8ecae6",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 10,
    flex: 1,
    color: "black",
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#00c6ff",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 6,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
