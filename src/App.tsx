import React from 'react';

function App() {
  const [curPos, setCurPos] = React.useState<any>(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      setCurPos(position);
      console.log(position);
    });
  }, [])

  return (
    <>
      <h1>
        Ranter
      </h1>
      
        {
          curPos != null && 
            <ul>
              <li>
                Latitude: {curPos.coords.latitude}
              </li>
              <li>
                Longitude: {curPos.coords.longitude}
              </li>
            </ul>
        }
        {
          curPos == null &&
          <p>
            Loading...
          </p>
        }
    </>
  );
}

export default App;
