import * as React from 'react';
import { json } from '../utils/api';
import { Text, Card, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../typescript/HomeParamList';
import { RouteProp } from '@react-navigation/native';

const SingleBlog: React.FC<SingleBlogProps> = ({ route, navigation }) => {

  const { itemId } = route.params;

  const [blog, setBlog] = React.useState<Blog>({});

  const getBlog = async () => {
    const res = await json(`https://dry-fortress-88365.herokuapp.com/api/blogs/${itemId}`);
    setBlog(res[0]);
  }

  React.useEffect(() => {
    getBlog();
  }, [itemId]);

  return (
    <>
      <Card>
        <Text h1>{blog.title}</Text>
        <Text style={{ marginBottom: 20, fontSize: 22 }} >Author: {blog.firstname} {blog.lastname}</Text>
        <Text>{blog.content}</Text>

      </Card>

      <Button title="Go Home" style={{ margin: 20 }} onPress={() => navigation.navigate('AllBlogs')} />
    </>
  );
}

interface SingleBlogProps {
  navigation: StackNavigationProp<HomeParamList, 'SingleBlog'>;
  route: RouteProp<HomeParamList, 'SingleBlog'>;
}

interface Blog {
  id?: number;
  title?: string;
  content?: string;
  authorid?: number;
  _created?: string;
  firstname?: string;
  lastname?: string;
};

export default SingleBlog;
