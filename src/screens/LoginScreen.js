import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
    // Estados para los campos y errores
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Función para validar formato de email
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Función para validar los campos antes de hacer login
    const validateForm = () => {
        let newErrors = {};

        if (!email) {
            newErrors.email = 'El email es obligatorio.';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'El formato del email es inválido.';
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Función para iniciar sesión
    const handleLogin = async () => {
        if (!validateForm()) {
            return; // No permite continuar si hay errores
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home'); // Redirige a Home si el login es exitoso
        } catch (error) {
            setErrors({ firebase: 'Error al iniciar sesión: ' + error.message });
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>
            
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                errorMessage={errors.email}
            />

            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                errorMessage={errors.password}
            />

            {errors.firebase && <Text style={styles.error}>{errors.firebase}</Text>}

            <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                disabled={!email || !password} // Deshabilita si los campos son inválidos
                containerStyle={styles.button}
            />

            <Button
                title="Registrarse"
                type="outline"
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
            />
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginVertical: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

