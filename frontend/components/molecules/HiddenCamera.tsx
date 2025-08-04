// import { CameraView, useCameraPermissions, Camera } from "expo-camera";
// import { useEffect, useRef, useState } from "react";
// import { StyleSheet, Text, View, Button } from "react-native";

// export default function HiddenCamera({
//   setPictures,
// }: {
//   setPictures: (pics: { front: string; back: string }) => void;
// }) {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [facing, setFacing] = useState<"front" | "back">("back");
//   const [hasCapturedBack, setHasCapturedBack] = useState(false);
//   const cameraRef = useRef<Camera>(null);

//   useEffect(() => {
//     if (permission?.granted && cameraRef.current) {
//       const capture = async () => {
//         try {
//           const photo = await cameraRef.current?.takePictureAsync({
//             skipProcessing: true,
//           });

//           if (facing === "back") {
//             // Store back photo, flip to front
//             setPictures((prev) => ({ ...prev, back: photo.uri }));
//             setHasCapturedBack(true);
//             setFacing("front");
//           } else if (facing === "front") {
//             // Store front photo, done
//             setPictures((prev) => ({ ...prev, front: photo.uri }));
//           }
//         } catch (e) {
//           console.error("Camera capture error:", e);
//         }
//       };

//       // Capture shortly after render
//       const timeout = setTimeout(() => capture(), 1000);
//       return () => clearTimeout(timeout);
//     }
//   }, [facing, permission?.granted]);

//   if (!permission) return null;
//   if (!permission.granted)
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to use the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );

//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing}
//         onCameraReady={() => {
//           console.log("Camera is ready");
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 100,
//     height: 100,
//     overflow: "hidden",
//     backgroundColor: "black",
//     zIndex: 999,
//   },
//   message: {
//     textAlign: "center",
//     paddingBottom: 10,
//   },
//   camera: {
//     width: 100,
//     height: 100,
//   },
// });

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HiddenCamera({
  setPictures,
}: {
  setPictures: (pics: { front?: string; back?: string }) => void;
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef(null);

  // const [permission, requestPermission] = useCameraPermissions();

  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.message}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }
  // toggle and take picture in both sides

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  useEffect(() => {
    if (cameraRef.current) {
      const capture = async () => {
        try {
          const photo = await cameraRef.current?.takePictureAsync({
            skipProcessing: true,
          });

          if (facing === "back") {
            //store back photo, flip to front
            setPictures((prev) => ({ ...prev, back: photo.uri }));
            setFacing("front");
          } else if (facing === "front") {
            //store front photo, done
            setPictures((prev) => ({ ...prev, front: photo.uri }));
          }
        } catch (error) {
          console.error("Camera capture error:", error);
        }
      };

      //capture shortly after render
      const timeOut = setTimeout(() => capture(), 1000);
      return () => clearTimeout(timeOut);
    }
  }, [facing]);

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        onMountError={(error) => {
          console.error("Camera error:", error);
          // Handle camera mount error
        }}
        onCameraReady={() => console.log("Camera is ready")}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    width: 1,
    height: 1,
    // top: 0,
    // left: 0,
    // width: "%",
    // height: "50%",
    // width: "100%",
    // height: "50%",
    overflow: "hidden",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
