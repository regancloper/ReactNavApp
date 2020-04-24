import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from './typescript/AppParamList';
import { AntDesign, Ionicons, EvilIcons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';

interface AppTabsProps { }

const Tabs = createBottomTabNavigator<AppParamList>();


export const AppTabs: React.FC<AppTabsProps> = ({ }) => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'ios-information-circle';
                        return <AntDesign name={"home"} size={size} color={color} />;
                    } else if (route.name === 'Search') {
                        iconName = 'ios-list-box';
                        return <EvilIcons name={"search"} size={size} color={color} />;
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tabs.Screen name="Home" component={HomeStack} />
            <Tabs.Screen name="Search" component={SearchStack} />
        </Tabs.Navigator >
    );
}