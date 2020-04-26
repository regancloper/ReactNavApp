import React, { useContext, useRef, useState, useEffect } from 'react';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { AuthContext } from './AuthProvider';
import faker from 'faker';
import { HomeParamList, HomeStackNavProps } from './typescript/HomeParamList';
import AllBlogs from './components/AllBlogs';
import SingleBlog from './components/SingleBlog';

interface HomeStackProps { }

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<'Feed'>) {
    return (
        <Center>
            <FlatList
                style={{ width: '100%' }}
                renderItem={({ item }) => {
                    return (
                        <Button
                            title={item}
                            onPress={() => {
                                navigation.navigate('Product', {
                                    name: item
                                });
                            }}
                        />
                    );
                }}
                keyExtractor={(product, idx) => product + idx}
                data={Array.from(Array(50), () => faker.commerce.product())}
            />
        </Center>
    );
}

function Product({ route, navigation }: HomeStackNavProps<'Product'>) {
    return (
        <Center>
            <Text>{route.params.name}</Text>
            <Button
                title="Edit This Product"
                onPress={() =>
                    navigation.navigate('EditProduct', {
                        name: route.params.name
                    })
                }
            />
        </Center>
    );
}

function apiCall(x: any) {
    return x;
}

function EditProduct({ route, navigation }: HomeStackNavProps<'EditProduct'>) {
    const [formState] = useState();
    const submit = useRef(() => {});

    submit.current = () => {
        // api call with new form state
        apiCall(formState);
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setParams({ submit });
    }, []);
    
    return (
        <Center>
            <Text>editing {route.params.name}...</Text>
        </Center>
    );
}

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const { logout } = useContext(AuthContext);
    return (
        <Stack.Navigator initialRouteName="AllBlogs">
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: `Edit: ${route.params.name}`,
                    headerRight: () => (
                        <TouchableOpacity 
                        onPress={() => {
                            // submit the form
                            if (route.params.submit) {
                                route.params.submit.current();
                            }
                        }}
                        style={{ paddingRight: 8 }}
                        >
                            <Text
                                style={{
                                    color: 'red'
                                }}
                            >
                                Done
                            </Text>
                        </TouchableOpacity>
                    )
                })}
                name="EditProduct"
                component={EditProduct}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: `Product: ${route.params.name}`
                })}
                name="Product"
                component={Product}
            />
            <Stack.Screen
                name="Feed"
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                style={{ paddingRight: 12 }}
                                onPress={() => {
                                    logout();
                                }}
                            >
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        );
                    }
                }}
                component={Feed}
            />
            <Stack.Screen
              name="AllBlogs"
              component={AllBlogs}
              options={{
                title: 'My Home',
                headerRight: () => {
                    return (
                        <TouchableOpacity
                            style={{ paddingRight: 12 }}
                            onPress={() => {
                                logout();
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    );
                }
              }}
            />
            <Stack.Screen
              name="SingleBlog"
              component={SingleBlog}
              options={{
                title: 'Single Blog'
              }}
            />
        </Stack.Navigator>
    );
}