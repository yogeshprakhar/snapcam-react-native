import { View } from "react-native";
import * as React from "react";

import { CameraView, CameraMode, BarcodeScanningResult } from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import IconButton from "@/components/IconButton";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import { useRef } from "react";
import QRCodeButton from "@/components/QRCodeButton";

export default function HomeScreen() {
  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [qrCodeDetected, setQrCodeDetected] = React.useState<string>("");
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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
    <View style={{ flex: 1 }}>
      <CameraView
        mode={cameraMode}
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
        <MainRowActions
          cameraMode={cameraMode}
          handleTakePicture={() => {}}
          isRecording={isRecording}
        />
        <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} />
      </CameraView>
    </View>
  );
}
