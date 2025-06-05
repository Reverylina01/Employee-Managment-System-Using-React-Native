import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

const Summary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchAttendanceReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.2.163:8080/attendances-report-all-employees`,
        {
          params: {
            month: currentDate.month() + 1,
            year: currentDate.year(),
          },
        }
      );

      setAttendanceData(response.data.report || []);
      setFilteredData(response.data.report || []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch attendance report.");
      setAttendanceData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchAttendanceReport();
  }, [fetchAttendanceReport]);

  const goToNextMonth = () => {
    setCurrentDate((prev) => moment(prev).add(1, "months"));
  };

  const goToPrevMonth = () => {
    setCurrentDate((prev) => moment(prev).subtract(1, "months"));
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAttendanceReport();
  };

  // Search handler: filter by employee name or ID (case insensitive)
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = attendanceData.filter((item) => {
      const lowerText = text.toLowerCase();
      return (
        item?.name?.toLowerCase().includes(lowerText) ||
        item?.employeeId?.toLowerCase().includes(lowerText)
      );
    });
    setFilteredData(filtered);
  };

  const abbreviations = [
    { label: "P", title: "Present", color: "#1b5e20" }, // Dark Green
    { label: "A", title: "Absent", color: "#b71c1c" },  // Dark Red
    { label: "HD", title: "Half Day", color: "#ff6f00" }, // Orange
    { label: "CL", title: "Casual Leave", color: "#006064" }, // Teal
    { label: "EL", title: "Earned Leave", color: "#004d40" }, // Dark Teal
    { label: "ML", title: "Medical Leave", color: "#4a148c" }, // Deep Purple
  ];

  // Calculate totals across employees
  const totals = filteredData.reduce(
    (acc, item) => {
      acc.present += item.present ?? 0;
      acc.absent += item.absent ?? 0;
      acc.halfday += item.halfday ?? 0;
      acc.casualLeave += item.casualLeave ?? 0;
      acc.earnedLeave += item.earnedLeave ?? 0;
      acc.medicalLeave += item.medicalLeave ?? 0;
      return acc;
    },
    {
      present: 0,
      absent: 0,
      halfday: 0,
      casualLeave: 0,
      earnedLeave: 0,
      medicalLeave: 0,
    }
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or ID..."
          placeholderTextColor="#a0a0a0"
          value={searchText}
          onChangeText={handleSearch}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
      </View>

      <View style={styles.navigation}>
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={28}
          color="#004d40"
        />
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={28}
          color="#004d40"
        />
      </View>

      <View style={styles.legendContainer}>
        {abbreviations.map(({ label, title, color }) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{`${label} = ${title}`}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Monthly Attendance Summary</Text>
        <DataTable>
          <DataTable.Header>
            {abbreviations.map(({ label }) => (
              <DataTable.Title key={label} style={styles.headerCell}>
                <Text style={styles.headerLabel}>{label}</Text>
              </DataTable.Title>
            ))}
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{totals.present}</DataTable.Cell>
            <DataTable.Cell>{totals.absent}</DataTable.Cell>
            <DataTable.Cell>{totals.halfday}</DataTable.Cell>
            <DataTable.Cell>{totals.casualLeave || "-"}</DataTable.Cell>
            <DataTable.Cell>{totals.earnedLeave || "-"}</DataTable.Cell>
            <DataTable.Cell>{totals.medicalLeave || "-"}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#004d40"
            style={{ marginTop: 20 }}
          />
        ) : filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <View key={index} style={styles.employeeCard}>
              <View style={styles.employeeHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item?.name?.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.employeeName}>{item?.name}</Text>
                  <Text style={styles.employeeDetails}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
              </View>

              <View style={styles.tableWrapper}>
                <DataTable>
                  <DataTable.Header>
                    {abbreviations.map(({ label, color }) => (
                      <DataTable.Title
                        key={label}
                        style={[styles.headerCell, { backgroundColor: color + "22" }]} // subtle tint
                      >
                        <Text style={[styles.headerLabel, { color }]}>
                          {label}
                        </Text>
                      </DataTable.Title>
                    ))}
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell>{item?.present}</DataTable.Cell>
                    <DataTable.Cell>{item?.absent}</DataTable.Cell>
                    <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                    <DataTable.Cell>{item?.casualLeave ?? "-"}</DataTable.Cell>
                    <DataTable.Cell>{item?.earnedLeave ?? "-"}</DataTable.Cell>
                    <DataTable.Cell>{item?.medicalLeave ?? "-"}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No attendance data found.</Text>
            <Text style={styles.noDataSubText}>
              Try adjusting your search or refreshing.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2f1", // subtle teal background
  },
  headerContainer: {
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 4,
  },
  searchInput: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: "#004d40",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    color: "#004d40",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    justifyContent: "center",
    marginVertical: 18,
  },
  dateText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#004d40",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 6,
  },
  legendColorBox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#004d40",
  },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 22,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#004d40",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 9,
    elevation: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#004d40",
    paddingLeft: 20,
    marginBottom: 10,
  },
  headerCell: {
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  headerLabel: {
    fontWeight: "700",
  },
  content: {
    marginHorizontal: 20,
  },
  employeeCard: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#004d40",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  employeeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#00796b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#004d40",
  },
  employeeDetails: {
    fontSize: 14,
    fontWeight: "500",
    color: "#00796b",
  },
  tableWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  noData: {
    marginTop: 40,
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#b71c1c",
  },
  noDataSubText: {
    fontSize: 14,
    color: "#b71c1c",
    marginTop: 4,
  },
});
