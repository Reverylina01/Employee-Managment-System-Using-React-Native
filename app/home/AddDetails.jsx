import { StyleSheet, Text, TextInput, View, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const AddDetails = () => {
  const [country, setCountry] = useState('India');
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [dob, setDob] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');

  const handleRegister = () => {
    if (!name || !employeeId || !dob || !mobileNo || !joiningDate || !salary || !address || !designation) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }

    const employeeData = {
      employeeName: name,
      employeeId,
      designation,
      phoneNumber: mobileNo,
      dateOfBirth: dob,
      joiningDate,
      activeEmployee: true,
      salary,
      address,
      country,
    };

    axios.post("http://192.168.2.163:8080/addEmployee", employeeData)
      .then((res) => {
        Alert.alert("Registration Success", res.data.message);
        // Reset form
        setCountry('India');
        setName('');
        setEmployeeId('');
        setDob('');
        setMobileNo('');
        setJoiningDate('');
        setSalary('');
        setAddress('');
        setDesignation('');
      })
      .catch((err) => {
        Alert.alert("Registration Fail", "An Error occurred during registration");
        console.error(err);
      });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <Text style={styles.title}>Add a New Employee</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="India" value="India" />
            <Picker.Item label="United States" value="United States" />
            <Picker.Item label="United Kingdom" value="United Kingdom" />
            <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="Australia" value="Australia" />
            {/* Add more countries as needed */}
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name (First and Last Name)</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Employee ID</Text>
        <TextInput
          value={employeeId}
          onChangeText={setEmployeeId}
          style={styles.input}
          placeholder="Enter Employee ID"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          value={dob}
          onChangeText={setDob}
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          value={mobileNo}
          onChangeText={setMobileNo}
          style={styles.input}
          placeholder="Enter Mobile Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Joining Date</Text>
        <TextInput
          value={joiningDate}
          onChangeText={setJoiningDate}
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Salary</Text>
        <TextInput
          value={salary}
          onChangeText={setSalary}
          style={styles.input}
          placeholder="Enter Salary"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={[styles.input, { height: 80 }]}
          placeholder="Enter Address"
          placeholderTextColor="#999"
          multiline
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Designation</Text>
        <TextInput
          value={designation}
          onChangeText={setDesignation}
          style={styles.input}
          placeholder="Enter Designation"
          placeholderTextColor="#999"
        />
      </View>

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </Pressable>
    </ScrollView>
  )
}

export default AddDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    color: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pickerWrapper: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#222',
  },
  button: {
    backgroundColor: '#0dcaf0',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#0dcaf0',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 16,
  },
});
