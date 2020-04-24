import React, { useState } from 'react';
import { Button, FlatList, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchParamList, SearchStackNavProps } from './typescript/SearchParamList';
import { Center } from './Center';
import faker from 'faker';

interface SearchStackProps {

}

const Stack = createStackNavigator<SearchParamList>();


function Search({ navigation }: SearchStackNavProps<'Search'>) {
    const [show, setShow] = useState(false)
    return (
        <Center>
            <Button title="Search Products" onPress={() => {
                setShow(true);
            }} />
            {show ? <FlatList
                style={{ width: '100%' }}
                renderItem={({ item }) => {
                    return (
                        <Button
                            title={item}
                            onPress={() => {
                                navigation.navigate('SearchResult');
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

function SearchResult() {
    return (
        <Center>
            <Text>Thanks for clicking on a search result!</Text>
        </Center>
    );
}

export const SearchStack: React.FC<SearchStackProps> = ({ }) => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name='SearchResult' component={SearchResult} />
        </Stack.Navigator>
    );
}