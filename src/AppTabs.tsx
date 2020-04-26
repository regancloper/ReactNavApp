import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from './typescript/AppParamList';
import { Ionicons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { ComposeStack } from './ComposeStack';

interface AppTabsProps { }

const Tabs = createBottomTabNavigator<AppParamList>();


export const AppTabs: React.FC<AppTabsProps> = ({ }) => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Compose') {
                        iconName = 'ios-create';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tabs.Screen name="Home" component={HomeStack} />
            <Tabs.Screen name="Compose" component={ComposeStack} />
        </Tabs.Navigator >
    );
}