import { View } from "react-native";
import * as React from "react";

import {
  CameraView,
  CameraMode,
  BarcodeScanningResult,
  FlashMode,
} from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import IconButton from "@/components/IconButton";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import { useRef } from "react";
import QRCodeButton from "@/components/QRCodeButton";
import CameraTools from "@/components/CameraTools";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

export default function HomeScreen() {
  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [qrCodeDetected, setQrCodeDetected] = React.useState<string>("");
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    "back"
  );
  const [cameraZoom, setCameraZoom] = React.useState<number>(0);

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  function handleBarcodeScanned(scanningResult: BarcodeScanningResult) {
    if (scanningResult.data) {
      console.log(scanningResult.data);
      setQrCodeDetected(scanningResult.data);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 1000);
  }
  if (isBrowsing) return <></>;

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <CameraView
          mode={cameraMode}
          zoom={cameraZoom}
          flash={cameraFlash}
          enableTorch={cameraTorch}
          facing={cameraFacing}
          ref={cameraRef}
          style={{ flex: 1 }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        >
          {qrCodeDetected ? (
            <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
          ) : null}
          <CameraTools
            cameraZoom={cameraZoom}
            // cameraFlash={cameraFlash}
            // cameraTorch={cameraTorch}
            setCameraZoom={setCameraZoom}
            setCameraFacing={setCameraFacing}
            setCameraTorch={setCameraTorch}
            setCameraFlash={setCameraFlash}
          />
          <MainRowActions
            cameraMode={cameraMode}
            handleTakePicture={() => {}}
            isRecording={isRecording}
          />
          <BottomRowTools
            cameraMode={cameraMode}
            setCameraMode={setCameraMode}
          />
        </CameraView>
      </View>
    </Animated.View>
  );
}
