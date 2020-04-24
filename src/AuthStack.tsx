import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList, AuthNavProps } from './typescript/AuthParamList';
import { AuthContext } from './AuthProvider';
import { Center } from './Center';
import { json, SetAccessToken, getUser } from './utils/api';


interface AuthStackProps { }

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation}: AuthNavProps<'Login'>) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true);
        try {
            let result = await json('https://dry-fortress-88365.herokuapp.com/auth/login', 'POST', {
                email,
                password
            });

            if (result) {
                await SetAccessToken(result.token, { userid: result.userid, role: result.role });
                login();
            } else {
                setLoading(false);
            }

        } catch (e) {
            console.log(e);
            throw new Error(e);
        } 
    }

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Input
                    textContentType="emailAddress"
                    containerStyle={{ marginVertical: 5 }}
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    leftIconContainerStyle={{ marginHorizontal: 12 }}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}>
                </Input>
                <Input
                    secureTextEntry={true}
                    textContentType="password"
                    containerStyle={{ marginVertical: 5 }}
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    leftIconContainerStyle={{ marginHorizontal: 12 }}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}>
                </Input>
            </View>
            <View style={{ flex: 1 }}>
                <Button
                    raised
                    title="Register"
                    containerStyle={{ margin: 10 }}
                    buttonStyle={{ backgroundColor: 'green' }}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                />
                <Button
                    raised
                    title="Login"
                    containerStyle={{ margin: 10 }}
                    buttonStyle={{ backgroundColor: '#0091ea' }}
                    onPress={() => {
                        handleLogin();
                    }}

                />
            </View>
        </View>
    );
}

function Register({
    navigation,
    route
}: AuthNavProps<'Register'>) {
    return (
        <Center>
            <Text>Route name: {route.name}</Text>
            <Button
                title="Go to Login"
                onPress={() => {
                    navigation.navigate('Login');
                }}
            />
        </Center>
    );
}

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen
                options={{
                    headerTitle: 'Sign In'
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Sign Up'
                }}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});