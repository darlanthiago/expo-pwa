import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Camera as ExpoCamera } from "expo-camera";

const Camera = () => {
  const [hasPermission, setHasPermission] = useState(Boolean);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type} />
      <View>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === ExpoCamera.Constants.Type.back
                ? ExpoCamera.Constants.Type.front
                : ExpoCamera.Constants.Type.back
            );
          }}
        >
          <Text> Flip </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;
