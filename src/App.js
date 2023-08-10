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
