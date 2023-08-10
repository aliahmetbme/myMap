import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import  Modal  from 'react-native-modal'

function userInfoCard({visible, close, user}) {
    return(
        <Modal 
            style={styles.modal}
            isVisible={visible} 
            swipeDirection="down" 
            onSwipeComplete={close} 
            onBackdropPress={close} 
            onBackButtonPress={close}>
            <View style={styles.container}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.fullnane}>{user.first_name}  {user.last_name}</Text>
                <SafeAreaView style={styles.safeArea}/>
            </View>
        </Modal>
    )
}

export default userInfoCard


const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 0,
    backgroundColor: 'white',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  fullname: {
    fontSize: 16,
  },
});