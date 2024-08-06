import { View } from "react-native";
import * as React from "react";

import { CameraView, CameraMode } from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import IconButton from "@/components/IconButton";
import BottomRowTools from "@/components/BottomRowTools";

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }}>
        <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} />
        {/* <IconButton androidName="accessibility" onPress={() => {}} /> */}
      </CameraView>
    </View>
  );
}
