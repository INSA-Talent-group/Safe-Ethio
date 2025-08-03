import { StyleSheet, Text } from "react-native";

export default function BodyText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <Text style={[style, styles.bodyText]}>{children}</Text>;
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
});
