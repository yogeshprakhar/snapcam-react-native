import { View } from "react-native";
import IconButton from "./IconButton";
import { FlashMode } from "expo-camera";

interface CameraToolsProps {
  cameraZoom: number;
  //   cameraFlash: FlashMode;
  //   cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}
export default function CameraTools({
  cameraZoom,
  //   cameraFlash,
  //   cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}: CameraToolsProps) {
  return (
    <View
      style={{
        position: "absolute",
        top: 40,
        right: 6,
        zIndex: 1,
        gap: 16,
      }}
    >
      <IconButton
        onPress={() => setCameraTorch((prevValue) => !prevValue)}
        androidName="flashlight"
      />
      <IconButton
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        androidName="camera-reverse"
      />
      <IconButton
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        androidName="flash"
      />
      <IconButton onPress={() => {}} androidName="volume-high" />
      <IconButton
        onPress={() => {
          // increment by .01
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.2);
          }
        }}
        androidName="add-circle-outline"
      />
      <IconButton
        onPress={() => {
          // decrement by .01
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.2);
          }
        }}
        androidName="remove-circle-outline"
      />
    </View>
  );
}
