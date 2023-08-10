import {View, Image} from 'react-native';
import {Marker} from 'react-native-maps';

const UserMarker = ({coordinates, userImage, onSelect}) => {
  return (
    <Marker onPress={onSelect} coordinate={coordinates}>
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'white',
            borderColor: '#DADADA',
            borderWidth: 2,
          }}
          source={{uri: userImage}}
        />
      </View>
    </Marker>
  );
};

export default UserMarker;
