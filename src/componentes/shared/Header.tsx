import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface HeaderProps {
    user: User;
    token: string;
  }

export default function Header({ user, token }: HeaderProps) {
    const navigation = useNavigation();
    return(
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>On School</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name} </Text>
            </View>
            {user?.isadmin==true && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('ListUsers', { token })}
            >
              <Text style={styles.buttonText}>Manage Users</Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,  
        borderColor: 'none',                 
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
        alignItems: 'flex-end',
      },
      headerButton: {
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
      },
      buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      }
})