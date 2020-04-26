import React, { useState } from 'react';
import { Button, FlatList, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ComposeParamList, ComposeStackNavProps } from './typescript/ComposeParamList';
import { Center } from './Center';
import faker from 'faker';

interface ComposeStackProps {

}

const Stack = createStackNavigator<ComposeParamList>();


function Compose({ navigation }: ComposeStackNavProps<'Compose'>) {
    const [show, setShow] = useState(false)
    return (
        <Center>
            <Button title="Compose Products" onPress={() => {
                setShow(true);
            }} />
            {show ? <FlatList
                style={{ width: '100%' }}
                renderItem={({ item }) => {
                    return (
                        <Button
                            title={item}
                            onPress={() => {
                                navigation.navigate('ComposeResult');
                            }}
                        />
                    );
                }}
                keyExtractor={(product, idx) => product + idx}
                data={Array.from(Array(50), () => faker.commerce.product())}
            /> : null}
        </Center>
    );
}

function ComposeResult() {
    return (
        <Center>
            <Text>Thanks for clicking on a Compose result!</Text>
        </Center>
    );
}

export const ComposeStack: React.FC<ComposeStackProps> = ({ }) => {
    return (
        <Stack.Navigator initialRouteName="Compose">
            <Stack.Screen name='Compose' component={Compose} />
            <Stack.Screen name='ComposeResult' component={ComposeResult} />
        </Stack.Navigator>
    );
}