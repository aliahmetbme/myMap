import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator color={"blue"} size={"large"} style={{position: 'absolute',left:150, bottom:200, backgroundColor:"white", alignSelf:"center", borderRadius:10, padding:10,borderWidth:2,borderColor:"#e0e0e0"}}></ActivityIndicator>
    </View>
  );
};

export default Loading