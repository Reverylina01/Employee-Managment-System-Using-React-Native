import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import axios from "axios";

const Attendance = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://192.168.2.163:8080/attendances");
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  const applyFilters = (searchText, status, dateText) => {
    const filtered = data.filter((item) => {
      const matchesSearch =
        item.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        status === "All" || item.status.toLowerCase() === status.toLowerCase();

      const matchesDate =
        dateText === "" ||
        item.date.toLowerCase().includes(dateText.toLowerCase());

      return matchesSearch && matchesStatus && matchesDate;
    });
    setFilteredData(filtered);
  };

  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, statusFilter, dateFilter);
  };

  const handleDateFilter = (text) => {
    setDateFilter(text);
    applyFilters(search, statusFilter, text);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    applyFilters(search, status, dateFilter);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>👤 {item.employeeName}</Text>
      <Text style={styles.text}>🆔 {item.employeeId}</Text>
      <Text style={styles.text}>📅 {item.date}</Text>
      <Text style={[styles.text, styles[item.status.toLowerCase()] || styles.other]}>
        ✅ {item.status}
      </Text>
    </View>
  );

  // Summary count by status
  const getCount = (status) =>
    filteredData.filter((i) => i.status === status).length;

  const message = `Filtered: ${filteredData.length} records`;

  const statuses = ["All", "Present", "Absent", "Half Day", "Holiday"];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📋 Attendance</Text>

      <TextInput
        placeholder="🔍 Search name or ID"
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
      />

      <TextInput
        placeholder="📅 Filter by Date (e.g., 2025-06-03)"
        style={styles.input}
        value={dateFilter}
        onChangeText={handleDateFilter}
      />

      <View style={styles.row}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => handleStatusChange(status)}
            style={[
              styles.filterButton,
              statusFilter === status && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                statusFilter === status && styles.activeText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.present}>✅ Present: {getCount("Present")}</Text>
        <Text style={styles.absent}>❌ Absent: {getCount("Absent")}</Text>
        <Text style={styles.halfday}>🕐 Half Day: {getCount("Half Day")}</Text>
        <Text style={styles.holiday}>🎉 Holiday: {getCount("Holiday")}</Text>
        <Text style={styles.total}>🧾 Total: {filteredData.length}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id || item.employeeId}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f4f7fb" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#34495e",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    flexBasis: "18%",
    padding: 8,
    marginVertical: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    alignItems: "center",
  },
  activeButton: { backgroundColor: "#4e73df" },
  filterText: { fontWeight: "600", color: "#333", fontSize: 13 },
  activeText: { color: "#fff" },
  messageContainer: {
    padding: 10,
    backgroundColor: "#4e73df",
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  messageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  summary: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  present: { color: "green", fontWeight: "bold" },
  absent: { color: "red", fontWeight: "bold" },
  halfday: { color: "#e67e22", fontWeight: "bold" },
  holiday: { color: "#8e44ad", fontWeight: "bold" },
  total: { color: "#2c3e50", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  text: { fontSize: 14, marginVertical: 2 },

  // Status colors
  present: { color: "green" },
  absent: { color: "red" },
  holiday: { color: "#8e44ad" },
  halfday: { color: "#e67e22" },
  other: { color: "#34495e" },
});

export default Attendance;
