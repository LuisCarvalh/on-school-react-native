import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'
import { deletePost, fetchPosts } from '@/src/services/post'
import { useNavigation } from '@react-navigation/native';
import { fetchUser } from '@/src/services/user';
import Header from '@/src/componentes/shared/Header';
import { Searchbar } from 'react-native-paper';

export default function Post({ route }) {
  const { token} = route.params;
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser(token);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    loadUser();
  }, [token]);

  useLayoutEffect(() => {
    if (user) {
      navigation.setOptions({
        headerTitle: () => <Header user={user} token={token} />,
      });
    }
  }, [navigation, user]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts(token, '', page, 10);
        setPosts(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    };

    loadPosts();
  }, [page, token]);

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetails', { post });
  };

  const handleEditPostPress = (token, userId, post: Post) => {
    navigation.navigate('EditPost', { token, userId, post });
  };

  const handleDelete = async (id:string) => {
    await deletePost(token, id);
    handleSearch(searchQuery);
  };

  const handleLoadMore = () => {
    if (page < totalPages - 1 && !isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    try {
      const response = await fetchPosts(token, value, page, 10);
      setPosts(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        {user?.isadmin && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.createPostButton}
              onPress={() => navigation.navigate('CreatePost', { token, userId: user.id })}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.post}
          onPress={() => handlePostPress(item)}
        >
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>Author: {item.author.name}</Text>
            <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
            {item?.updatedAt!=null && (
              <Text>Updated At: {new Date(item.updatedAt).toLocaleString()}</Text>
            )}
          </View>
            {user?.isadmin && (
              <View style={styles.postButtonContainer}>
                <TouchableOpacity style={styles.editPostButton} onPress={() => handleEditPostPress(token, user?.id, item)}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.deletePostButton} onPress={() => handleDelete(item.id)}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
              </View>
            )}
            </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  createPostButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deletePostButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  editPostButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  postButtonContainer: {
    justifyContent: 'space-evenly'
  }
});