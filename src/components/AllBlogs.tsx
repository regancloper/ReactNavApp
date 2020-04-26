import * as React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { json } from '../utils/api';
import BlogPreviewCard from './BlogPreviewCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../typescript/HomeParamList';

const AllBlogs: React.FC<AllBlogsProps> = ({ navigation }) => {

  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  const getBlogs = async () => {
    const res = await json('https://dry-fortress-88365.herokuapp.com/api/blogs');
    setBlogs(res);
  }

  React.useEffect(() => {
    getBlogs();
  }, []);

  const renderBlogs = () => {
    return blogs.map(blog => {
      return <BlogPreviewCard key={blog.id} blog={blog} navigation={navigation} />
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderBlogs()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


interface AllBlogsProps {
  navigation: StackNavigationProp<HomeParamList, 'AllBlogs'>;
}

interface Blog {
  id: number,
  title: string,
  content: string,
  authorid: number,
  _created: string,
  firstname: string,
  lastname: string
};



export default AllBlogs;
