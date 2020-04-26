import * as React from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../typescript/HomeParamList';

const BlogPreviewCard: React.FC<BlogPreviewProps> = (props) => {

    const { id, title, firstname, lastname } = props.blog;

    return (
        <Card
            title={title}
            image={{ uri: 'https://i.ytimg.com/vi/Fxi__sNIE1Q/maxresdefault.jpg' }}
            imageStyle={{width: 175, height: 175}}
        >
            <Text style={{ marginBottom: 10 }}>
                {`Written by:\n${firstname} ${lastname}`}
            </Text>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Read This Blog' 
                onPress={() => props.navigation.navigate('SingleBlog', {
                    itemId: id
                })}
            />
        </Card>
    );
}




interface BlogPreviewProps {
    blog: {
        id: number,
        title: string,
        content: string,
        authorid: number,
        _created: string,
        firstname: string,
        lastname: string
    };
    navigation: StackNavigationProp<HomeParamList, 'AllBlogs'>;
}


export default BlogPreviewCard;