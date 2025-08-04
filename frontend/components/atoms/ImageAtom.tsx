import { Dimensions, Image, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ImageAtom({
  source,
  style,
}: {
  source: any;
  style?: object;
}) {
  return <Image source={source} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.4, // 40% of screen height
    resizeMode: "cover",
    borderRadius: 10,
  },
});
