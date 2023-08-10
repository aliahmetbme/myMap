import React from 'react';
import axios from 'axios';

export default function useFetch(URL) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const fetch = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await axios.get(URL);
      setData(data.data)
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('error: ', err);
    }
  }, [URL]);

  React.useEffect(() => {
    fetch();
  }, []);

  return {data, error, loading}
}
