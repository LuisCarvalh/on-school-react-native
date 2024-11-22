import { View, Text, StyleSheet } from "react-native";

interface HeaderProps {
    userName: string;
  }

export default function Header({ userName }: HeaderProps) {
    return(
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>On School</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{userName}</Text>
            </View>
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
})