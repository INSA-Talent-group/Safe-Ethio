import { View } from "react-native";
import Button from "../atoms/Button";
import ImageAtom from "../atoms/ImageAtom";
import TitleText from "../atoms/TitleText";

export default function SlideContent({
  slide,
  isLast,
  onPress,
}: {
  slide: {
    key: string;
    title: string;
    text: string;
    image: any;
  };
  isLast?: boolean;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          gap: 10,
          borderRadius: 10,
        }}
      >
        <ImageAtom source={slide.image} />
        <TitleText>{slide.title}</TitleText>
        <TitleText style={{ marginBottom: 20 }}>{slide.text}</TitleText>
        {isLast && <Button title="Get Started" onPress={onPress} />}
      </View>
    </View>
  );
}
