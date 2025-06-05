import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  Easing,
  Button
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Feather,
  Entypo,
  Ionicons,
  Octicons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Dashboard = () => {
  const router = useRouter();

  const fadeAnims = Array.from({ length: 4 }, () => useRef(new Animated.Value(0)).current);
  const translateYAnims = Array.from({ length: 4 }, () => useRef(new Animated.Value(30)).current);
  const scaleAnims = Array.from({ length: 4 }, () => useRef(new Animated.Value(1)).current);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animations = fadeAnims.map((fadeAnim, i) =>
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          delay: i * 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnims[i], {
          toValue: 0,
          duration: 600,
          delay: i * 200,
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(150, animations).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onPressIn = (index) => {
    Animated.spring(scaleAnims[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (index) => {
    Animated.spring(scaleAnims[index], {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const quickActions = [
    {
      key: 'Employees',
      label: 'Employee List',
      icon: <Ionicons name="people" size={32} color="white" />,
      color: '#ff6b6b',
      route: '/home/Employees',
    },
    {
      key: 'MarkAttendance',
      label: 'Mark Attendance',
      icon: <AntDesign name="pushpin" size={32} color="white" />,
      color: '#1dd1a1',
      route: '/home/MarkAttendance',
    },
    {
      key: 'AttendanceReport',
      label: 'Attendance Report',
      icon: <Ionicons name="newspaper" size={32} color="white" />,
      color: '#54a0ff',
      route: '/home/Attendence',
    },
    {
      key: 'SummaryReport',
      label: 'Summary Report',
      icon: <Octicons name="repo-pull" size={32} color="white" />,
      color: '#954B98FF',
      route: '/home/Summary',
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f2f6ff' }}>
      {/* Header */}
      <LinearGradient
        colors={['#4b6cb7', '#E50BB9FF']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Feather name="monitor" size={28} color="white" />
          </Animated.View>
          <Text style={styles.headerTitle}>Employee Monitoring System</Text>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Entypo name="lock" size={28} color="white" />
          </Animated.View>
        </View>
        <Text style={styles.welcomeText}>Welcome Back, Admin!</Text>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        {quickActions.map((item, index) => (
          <Animated.View
            key={item.key}
            style={{
              opacity: fadeAnims[index],
              transform: [
                { translateY: translateYAnims[index] },
                { scale: scaleAnims[index] },
              ],
              width: '48%',
              marginBottom: 15,
            }}
          >
            <Pressable
              style={[styles.card, { backgroundColor: item.color }]}
              onPress={() => router.push(item.route)}
              onPressIn={() => onPressIn(index)}
              onPressOut={() => onPressOut(index)}
            >
              {item.icon}
              <Text style={styles.cardText}>{item.label}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>

      {/* Reports & Info */}
      <View style={styles.reportList}>
        <Text style={styles.sectionTitle}>Reports & Info</Text>

        <Pressable
          style={styles.reportItem}
          onPress={() => router.push('/home/Empdetails')}
        >
          <MaterialIcons name="assignment-ind" size={28} color="#4b6cb7" />
          <Text style={styles.reportText}>All Employee Details</Text>
          <Entypo name="chevron-right" size={24} color="#4b6cb7" />
        </Pressable>

        <Pressable
          style={styles.reportItem}
          onPress={() => router.push('/home/Criteria')}
        >
          <MaterialIcons name="rule" size={28} color="#4b6cb7" />
          <Text style={styles.reportText}>Attendance Policy</Text>
          <Entypo name="chevron-right" size={24} color="#4b6cb7" />
        </Pressable>

        <Pressable
          style={styles.reportItem}
          onPress={() => router.push('/home/About')}
        >
          <AntDesign name="infocirlceo" size={28} color="#4b6cb7" />
          <Text style={styles.reportText}>About Us</Text>
          <Entypo name="chevron-right" size={24} color="#4b6cb7" />
        </Pressable>
      </View>

      {/* Latest Updates */}
      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>New Attendance Feature Released</Text>
          <Text style={styles.newsDescription}>
            We have added geolocation-based attendance marking for enhanced security and accuracy.
          </Text>
        </View>
        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>Quarterly Review Meeting</Text>
          <Text style={styles.newsDescription}>
            The next quarterly review meeting is scheduled for July 10th. Please prepare your reports.
          </Text>
        </View>
      </View>

      {/* Quick Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Quick Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>✔ Always double-check attendance data before submitting reports.</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>✔ Encourage employees to use the mobile app for real-time updates.</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>✔ Set reminders for monthly attendance reviews.</Text>
        </View>
      </View>

      {/* Events */}
      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventItem}>
          <Text style={styles.eventDate}>June 15, 2025</Text>
          <Text style={styles.eventTitle}>Employee Wellness Workshop</Text>
          <Text style={styles.eventDescription}>
            A session focused on mental and physical health for all employees.
          </Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventDate}>July 1, 2025</Text>
          <Text style={styles.eventTitle}>System Maintenance</Text>
          <Text style={styles.eventDescription}>
            Scheduled maintenance for system upgrades. Expect downtime from 2–4 AM.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{ color: '#999' }}>© 2025 Employee Monitoring System</Text>
      </View> 
      <Text>{`\n`}</Text>
       <Pressable>
        <Button title="Logout" onPress={() => router.push("/")} color="#fd7e14" />
       </Pressable>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 16,
    color: '#dfe4ea',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  card: {
    borderRadius: 14,
    paddingVertical: 25,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  reportList: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
    elevation: 2,
  },
  reportText: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 15,
    color: '#2f3542',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2f3542',
  },
  newsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e272e',
  },
  newsDescription: {
    marginTop: 5,
    color: '#57606f',
    fontSize: 14,
  },
  tipsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  tipCard: {
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#00796b',
  },
  eventsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  eventItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  eventDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2f3542',
  },
  eventDescription: {
    fontSize: 13,
    color: '#57606f',
    marginTop: 3,
  },
  footer: {
    marginTop: 30,
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default Dashboard;
