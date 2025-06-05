import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const index = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const chklogin = () => {
    setLoading(true);
    setResult('');

    setTimeout(() => {
      if (adminId.trim() === 'Admin' && password === 'admin123') {
        setResult('Login Successful');
        setLoading(false);
        setTimeout(() => {
          router.push('/home');
        }, 1000);
      } else {
        setResult('Invalid AdminId or Password');
        setLoading(false);
      }
    }, 1200);
  };

  const clearFields = () => {
    setAdminId('');
    setPassword('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Admin Login</Text>

        <Text style={styles.label}>Admin ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Admin ID"
          onChangeText={setAdminId}
          value={adminId}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#636e72" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={chklogin} disabled={loading}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearFields}>
            <Text style={[styles.buttonText, { color: '#d63031' }]}>Clear</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#2e8b57" style={{ marginTop: 15 }} />}

        {result !== '' && (
          <Text style={result === 'Login Successful' ? styles.success : styles.error}>
            {result}
          </Text>
        )}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf0f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 26,
    color: '#2c3e50',
    marginBottom: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#2d3436',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#b2bec3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    fontSize: 16,
    color: '#2d3436',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeIcon: {
    marginLeft: -35,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2e8b57',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#ffeef0',
    marginRight: 0,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  success: {
    color: '#00b894',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#d63031',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
});
