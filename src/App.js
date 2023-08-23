import {View, Text} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Modal} from 'react-native';
import useFetch from './Hooks/useFetch';
import Loading from './Components/Loading';
import UserMarker from './Marker/UserMarker';
const URL = 'https://random-data-api.com/api/v2/users?size=30';
import InfoCard from './Components/userCard';
const App = () => {
  const mapRef = React.useRef();
  const [user, setUser] = React.useState();
  const [infoModalVisibility, setInfoModalVisibility] = React.useState(false);

  const {data, loading, error} = useFetch(URL);
  // console.log({data, loading, error});

  // marker a doğru zoom yapmak için
  async function handleMarkerSelect(coord, selectedUser) {
    setUser(selectedUser);
    handleModalVisibility();
    mapRef.current.animateToRegion({
      latitude: coord.lat,
      longitude: coord.lng,
      latitudeDelta: 4,
      longitudeDelta: 4,
    });

    const camera = await mapRef.current.getCamera();
    console.log(camera);
  }

  function handleModalVisibility() {
    setInfoModalVisibility(!infoModalVisibility);
  }

  function renderUserMarker() {
    return data.map(
      ({
        id,
        address: {coordinates},
        avatar,
        first_name,
        last_name,
        username,
      }) => {
        return (
          <UserMarker
            key={id}
            coordinates={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            }}
            userImage={avatar}
            onSelect={() =>
              handleMarkerSelect(coordinates, {first_name, last_name, username})
            }
          />
        );
      },
    );
  }
  return (
    <View style={{flex: 1}}>
      <MapView ref={mapRef} provider="google" style={{flex: 1}}>
        {data && renderUserMarker()}
        <Marker
            coordinate={{latitude: 38.44908939235593,  longitude: 27.185461234766574}}
            image={{uri: "data:image/png;base64,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"}}
        />
      </MapView>
      {loading && <Loading />}
      {user && (
        <InfoCard
          visible={infoModalVisibility}
          close={handleModalVisibility}
          user={user}
        />
      )}
    </View>
  );
};

export default App;
