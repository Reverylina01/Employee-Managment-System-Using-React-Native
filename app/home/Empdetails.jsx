import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Empdetails = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields state
  const [editName, setEditName] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editSalary, setEditSalary] = useState("");

  // Animation values
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const fetchData = async () => {
    try {
      const res = await axios.get("http://192.168.2.163:8080/employees");
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = data.filter((item) =>
      item.employeeName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const animateModalOpen = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 100,
      }),
    ]).start();
  };

  const animateModalClose = (callback) => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start(() => {
      callback && callback();
    });
  };

  const handleCardPress = (employee) => {
    setSelectedEmployee(employee);
    setEditName(employee.employeeName);
    setEditDesignation(employee.designation);
    setEditPhone(employee.phoneNumber);
    setEditSalary(employee.salary.toString());
    setIsEditing(false);
    setModalVisible(true);
    animateModalOpen();
  };

  const handleCloseModal = () => {
    animateModalClose(() => {
      setModalVisible(false);
      setSelectedEmployee(null);
      setIsEditing(false);
    });
  };

  const handleSort = (type) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (type === "salary") return b.salary - a.salary;
      return a.employeeName.localeCompare(b.employeeName);
    });
    setFilteredData(sorted);
    setSortBy(type);
  };

  // Handle Edit Save: Update data array and filteredData with new values
  const handleEditSave = async () => {
    if (!editName.trim()) {
      Alert.alert("Validation", "Employee name cannot be empty.");
      return;
    }
    if (isNaN(editSalary) || editSalary.trim() === "") {
      Alert.alert("Validation", "Please enter a valid salary.");
      return;
    }
    try {
      // Optional: If you have an API endpoint for updating employee, call it here.
      // await axios.put(`http://192.168.2.163:8080/employees/${selectedEmployee._id}`, {
      //   employeeName: editName,
      //   designation: editDesignation,
      //   phoneNumber: editPhone,
      //   salary: parseFloat(editSalary),
      // });

      // For now, update locally:
      const updatedEmployee = {
        ...selectedEmployee,
        employeeName: editName,
        designation: editDesignation,
        phoneNumber: editPhone,
        salary: parseFloat(editSalary),
      };

      // Update main data
      const updatedData = data.map((emp) =>
        emp._id === selectedEmployee._id ? updatedEmployee : emp
      );
      setData(updatedData);

      // Update filtered data too
      const updatedFiltered = filteredData.map((emp) =>
        emp._id === selectedEmployee._id ? updatedEmployee : emp
      );
      setFilteredData(updatedFiltered);

      setSelectedEmployee(updatedEmployee);
      setIsEditing(false);
      Alert.alert("Success", "Employee details updated.");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update employee details.");
    }
  };

  // Handle Delete with confirmation
  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${selectedEmployee.employeeName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Optional: call API delete endpoint here
              // await axios.delete(`http://192.168.2.163:8080/employees/${selectedEmployee._id}`);

              // Update local state:
              const newData = data.filter(
                (emp) => emp._id !== selectedEmployee._id
              );
              setData(newData);
              setFilteredData(newData);
              setModalVisible(false);
              setSelectedEmployee(null);
              Alert.alert("Deleted", "Employee record deleted.");
            } catch (err) {
              console.log(err);
              Alert.alert("Error", "Failed to delete employee.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${item.employeeName}&background=random`,
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.employeeName}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.designation}</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={28} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👨‍💼 Employee Directory</Text>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[styles.sortBtn, sortBy === "name" && styles.sortBtnActive]}
          onPress={() => handleSort("name")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.sortBtnText,
              sortBy === "name" && styles.sortBtnTextActive,
            ]}
          >
            Sort by Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortBtn, sortBy === "salary" && styles.sortBtnActive]}
          onPress={() => handleSort("salary")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.sortBtnText,
              sortBy === "salary" && styles.sortBtnTextActive,
            ]}
          >
            Sort by Salary
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
      ) : (
        <>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <Text style={styles.footerText}>Total Employees: {filteredData.length}</Text>
        </>
      )}

      {selectedEmployee && (
        <Modal
          visible={modalVisible}
          animationType="none"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <Animated.View style={[styles.modalContainer, { opacity: opacityAnim }]}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${selectedEmployee.employeeName}&background=random`,
                }}
                style={styles.modalAvatar}
              />

              {isEditing ? (
                <>
                  <TextInput
                    style={[styles.modalText, { borderBottomWidth: 1, padding: 5 }]}
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Name"
                  />
                  <TextInput
                    style={[styles.modalText, { borderBottomWidth: 1, padding: 5 }]}
                    value={editDesignation}
                    onChangeText={setEditDesignation}
                    placeholder="Designation"
                  />
                  <TextInput
                    style={[styles.modalText, { borderBottomWidth: 1, padding: 5 }]}
                    value={editPhone}
                    onChangeText={setEditPhone}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                  />
                  <TextInput
                    style={[styles.modalText, { borderBottomWidth: 1, padding: 5 }]}
                    value={editSalary}
                    onChangeText={setEditSalary}
                    placeholder="Salary"
                    keyboardType="numeric"
                  />
                </>
              ) : (
                <>
                  <Text style={styles.modalText}>
                    <Text style={{ fontWeight: "bold" }}>Name: </Text>
                    {selectedEmployee.employeeName}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={{ fontWeight: "bold" }}>Designation: </Text>
                    {selectedEmployee.designation}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={{ fontWeight: "bold" }}>Phone: </Text>
                    {selectedEmployee.phoneNumber}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={{ fontWeight: "bold" }}>Salary: </Text>₹{" "}
                    {selectedEmployee.salary}
                  </Text>
                </>
              )}

              <View style={styles.modalButtons}>
                {isEditing ? (
                  <>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: "#28a745" }]}
                      onPress={handleEditSave}
                    >
                      <Text style={styles.modalButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: "#6c757d" }]}
                      onPress={() => setIsEditing(false)}
                    >
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: "#007bff" }]}
                      onPress={() => setIsEditing(true)}
                    >
                      <Text style={styles.modalButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: "#dc3545" }]}
                      onPress={handleDelete}
                    >
                      <Text style={styles.modalButtonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: "#6c757d" }]}
                      onPress={handleCloseModal}
                    >
                      <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f7",
    padding: 10,
    paddingTop: 40,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 1,
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  searchIcon: {
    marginRight: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 6,
    padding: 12,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#222",
  },
  badge: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  sortBtn: {
    backgroundColor: "#e2e6ea",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 6,
  },
  sortBtnActive: {
    backgroundColor: "#007AFF",
  },
  sortBtnText: {
    color: "#000",
    fontWeight: "500",
  },
  sortBtnTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  footerText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    elevation: 10,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 6,
    color: "#333",
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Empdetails;
