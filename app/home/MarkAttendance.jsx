import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

const MarkAttendance = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());

  const formatDate = (date) => date.format("MMMM D, YYYY");
  const formattedDate = formatDate(currentDate);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://192.168.2.163:8080/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://192.168.186.163:8080/attendances`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );
    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "",
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f6fa" }}>
      <View style={styles.dateContainer}>
        <Pressable onPress={goToPrevDay}>
          <AntDesign name="left" size={24} color="#333" />
        </Pressable>
        <Text style={styles.dateText}>{formattedDate || "No date available"}</Text>
        <Pressable onPress={goToNextDay}>
          <AntDesign name="right" size={24} color="#333" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {employeeWithAttendance.map((item, index) => (
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              delay={index * 100}
              key={index}
            >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/home/User",
                    params: {
                      name: item.employeeName,
                      id: item.employeeId,
                      salary: item?.salary,
                      designation: item?.designation,
                    },
                  })
                }
                style={styles.card}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.employeeName}>{item?.employeeName}</Text>
                  <Text style={styles.employeeDetails}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
                {item?.status && (
                  <View style={styles.statusBox}>
                    <Text style={styles.statusText}>
                      {item.status.charAt(0)}
                    </Text>
                  </View>
                )}
              </Pressable>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MarkAttendance;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  listContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  employeeDetails: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  statusBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#FF69B4",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
