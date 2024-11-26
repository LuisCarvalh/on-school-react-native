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
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: 'f8f9fa',
        paddingHorizontal: 16,  
        elevation: 2,              
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#333',
        letterSpacing: 1,
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userName: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
        fontWeight: '500',
      },
      buttonContainer: {
        alignItems: 'flex-end',
      },
      headerButton: {
        backgroundColor: '#87CEEB',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        shadowColor: '#87CEEB', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    
      },
      buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Roboto',
      }
})