import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SearchResults from '../../Components/SearchResults';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await axios.get("http://192.168.2.163:8080/employees");
        setEmployees(res.data);
      } catch (err) {
        console.log("error fetching employee data", err);
      }
    };
    fetchEmployeeData();
  }, []);

  const navigateToHomePage = () => {
    router.push("/home");
  };

  const handleAddEmployee = () => {
    router.push("/home/AddDetails");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={navigateToHomePage}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Employees 👨‍💼</Text>
        <Pressable onPress={handleAddEmployee}>
          <AntDesign name="pluscircleo" size={28} color="white" />
        </Pressable>
      </View>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#0072b1" />
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Search employee..."
          placeholderTextColor="#888"
          style={styles.input}
        />
      </View>

      {/* Employee List or Empty State */}
      <View style={{ flex: 1 }}>
        {employees.length > 0 ? (
          <SearchResults data={employees} input={input} setInput={setInput} />
        ) : (
          <View style={styles.emptyContainer}>
            <Entypo name="emoji-sad" size={70} color="#999" />
            <Text style={styles.emptyText}>No Employees Found</Text>
            <Text style={styles.subText}>Tap below to add an employee</Text>
            <Pressable onPress={handleAddEmployee} style={styles.addButton}>
              <AntDesign name="pluscircle" size={40} color="#0072b1" />
              <Text style={styles.addButtonText}>Add Employee</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef5ff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0072b1',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#222',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    color: '#333',
  },
  subText: {
    fontSize: 15,
    color: '#777',
    marginTop: 6,
  },
  addButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    marginTop: 6,
    color: '#0072b1',
    fontWeight: '500',
  },
});
