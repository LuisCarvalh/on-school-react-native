import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  user: User;
  token: string;
}

export default function Header({ user, token }: HeaderProps) {
  const navigation = useNavigation();
  return (
    <MenuProvider>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>On School</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        {user?.isadmin && (
          <View style={styles.buttonContainer}>
            <Menu>
              <MenuTrigger>
                <Icon name="menu" size={30} color="#007bff" />
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption onSelect={() => navigation.navigate('ListUsers', { token })}>
                  <Text style={styles.menuOptionText}>Usuarios</Text>
                </MenuOption>
                <MenuOption onSelect={() => navigation.navigate('Post', { token })}>
                  <Text style={styles.menuOptionText}>Posts</Text>
                </MenuOption>
                <MenuOption onSelect={() => navigation.navigate('Login', { token })}>
                  <Text style={styles.menuOptionText}>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        )}
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
});

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    width: 200,
    zIndex: 9999,
  },
  optionsWrapper: {
    backgroundColor: '#fff',
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    color: '#333',
  },
};