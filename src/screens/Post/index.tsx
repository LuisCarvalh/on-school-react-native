import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { fetchPosts } from '@/src/services/post'

export default function Post({ route }) {
  const { token } = route.params;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts(token, '', page, 10);
        setPosts(response.posts);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>Author: {item.author.name}</Text>
            <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  post: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});