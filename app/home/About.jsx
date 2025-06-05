import React from "react";
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from "react-native";

const About = () => {
    const openLink = (url) => Linking.openURL(url);

    const socialMedia = [
        { name: 'Website', icon: '🐦', url: 'https://aot.edu.in' },
        { name: 'Facebook', icon: '🔗', url: 'https://www.facebook.com/share/1771QR7ihP/' },
        { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/aotconnect?igsh=MWk2MzV5dGMybXg5eQ==' },
    ];

    const teamMembers = [
        {
            name: 'Shilpa Maity',
            role: 'Founder',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            name: 'Lina Das',
            role: 'CO-Founder',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
    ];

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F5F7FA' }} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={{ alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>

                {/* Header Image */}
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg' }}
                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                    resizeMode="cover"
                />

                {/* About Title */}
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginTop: 15 }}>
                    About Our App
                </Text>

                <Text style={{ fontSize: 16, textAlign: 'center', color: '#34495E', marginTop: 8 }}>
                    AOT Employee Manager is a smart HR solution designed to simplify and streamline workforce management. From attendance to analytics, it’s all-in-one.
                </Text>

                {/* Features Image */}
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10025/10025741.png' }}
                    style={{ width: 120, height: 120, marginTop: 20 }}
                    resizeMode="contain"
                />

                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginTop: 20, marginBottom: 10 }}>
    ⭐ Key Features
</Text>

<View
    style={{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
    }}
>
    {[
        'Real-time attendance & leave tracking',
        'Centralized employee profiles',
        'Secure payroll automation',
        'Performance reviews & tracking',
        'Role-based admin access',
        'Insightful dashboards & reports',
    ].map((feature, idx) => (
        <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ fontSize: 18, color: '#27AE60', marginRight: 8 }}>✔</Text>
            <Text style={{ fontSize: 15, color: '#34495E', flexShrink: 1 }}>{feature}</Text>
        </View>
    ))}
</View>


                {/* Workflow Image */}
                <Image
                    source={{ uri: 'https://www.sutisoft.com/blog/wp-content/uploads/2023/06/Employee-Management-Software.jpg' }}
                    style={{ width: '100%', height: 180, borderRadius: 10, marginTop: 20 }}
                    resizeMode="cover"
                />

                {/* Mission */}
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/954/954591.png' }}
                    style={{ width: 100, height: 100, marginTop: 20 }}
                    resizeMode="contain"
                />

                <Text style={{ fontSize: 20, fontWeight: '600', color: '#2C3E50', marginTop: 10 }}>Our Mission</Text>
                <Text style={{ fontSize: 15, marginTop: 8, color: '#34495E', textAlign: 'center' }}>
                    We aim to modernize workforce operations through intelligent systems and intuitive design. Our goal is to support growth, collaboration, and productivity across organizations.
                </Text>

                {/* Contact */}
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3178/3178158.png' }}
                    style={{ width: 100, height: 100, marginTop: 20 }}
                    resizeMode="contain"
                />

                <Text style={{ fontSize: 20, fontWeight: '600', color: '#2C3E50', marginTop: 10 }}>Contact Us</Text>
                <Text style={{ fontSize: 15, marginTop: 8, color: '#34495E', textAlign: 'center' }}>
                    📧 Email: support@aotemployeemanager.com{'\n'}
                    🌐 Website: www.aotemployeemanager.com{'\n'}
                    📍 G.T.ROAD | AEDCONAGAR, HOOGHLY-712121, WEST BENGAL, INDIA
                </Text>

                {/* Social Media */}
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    {socialMedia.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => openLink(item.url)}
                            style={{
                                marginHorizontal: 8,
                                backgroundColor: '#2C3E50',
                                borderRadius: 25,
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 22, color: '#fff' }}>{item.icon}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Team Section */}
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 30, color: '#2C3E50' }}>👥 Meet Our Team</Text>
                <View style={{ width: '100%', marginTop: 10 }}>
                    {teamMembers.map((member, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#ECF0F1',
                                padding: 12,
                                borderRadius: 10,
                                marginBottom: 10,
                                marginHorizontal: 5,
                            }}
                        >
                            <Image
                                source={typeof member.image === 'string' ? { uri: member.image } : member.image}
                                style={{ width: 55, height: 55, borderRadius: 28, marginRight: 12 }}
                                resizeMode="cover"
                            />
                            <View>
                                <Text style={{ fontWeight: '600', fontSize: 16, color: '#2C3E50' }}>{member.name}</Text>
                                <Text style={{ fontSize: 14, color: '#7F8C8D' }}>{member.role}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <Text style={{ fontSize: 13, color: '#7F8C8D', marginTop: 20 }}>
                    © 2025 AOT Employee Manager. All rights reserved.
                </Text>
            </View>
        </ScrollView>
    );
};

export default About;
