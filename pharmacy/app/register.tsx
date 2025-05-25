import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendVerification = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    setVerificationSent(true);
    Alert.alert('Verification Sent', 'A verification code has been sent to your email (demo).');
  };

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !verificationCode) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Account created (demo)!');
      router.push('/login');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.verificationRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <Button
          title={verificationSent ? 'Resend' : 'Send Code'}
          onPress={handleSendVerification}
          variant="outline"
          style={styles.sendCodeButton}
        />
      </View>
      <Button title={loading ? 'Registering...' : 'Register'} onPress={handleRegister} disabled={loading} style={styles.registerButton} />
      <TouchableOpacity onPress={() => router.push('/login')} style={styles.linkContainer}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    fontSize: 16,
    color: Colors.gray[800],
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
  },
  sendCodeButton: {
    marginLeft: 8,
    minWidth: 100,
  },
  registerButton: {
    width: '100%',
    maxWidth: 340,
    marginTop: 8,
    marginBottom: 16,
  },
  linkContainer: {
    marginTop: 8,
  },
  link: {
    color: Colors.primary,
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
}); 