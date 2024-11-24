import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Button} from 'react-native'
import { fetchPosts } from '@/src/services/post'
import { useNavigation } from '@react-navigation/native';
import { fetchUser, fetchUserList } from '@/src/services/user';
import Header from '@/src/componentes/shared/Header';
import { Searchbar } from 'react-native-paper';

export default function ListUsers({ route }) {
  const { token} = route.params;
  const [users, setUserList] = useState<User[]>([]);
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
    const loadUserList = async () => {
      try {
        const response = await fetchUserList(token, '', page, 10);
        setUserList(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Failed to fetch user list:', error);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    };

    loadUserList();
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

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    try {
      const response = await fetchUserList(token, value, page, 10);
      setUserList(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch user list:', error);
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
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.userContainer}>
            <Text style={styles.userInfo}>{item.name}{item?.isadmin===true && ( <Text style={styles.role}> {'('}Admin{')'}</Text>)}</Text>
            <Text style={styles.userInfo}>{item.email}</Text>
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
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfo: {
    fontSize: 18,
    fontWeight: 'regular',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  role: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});