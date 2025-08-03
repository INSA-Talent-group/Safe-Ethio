import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import SlideContent from "../molecules/SlideContent";

export default function OnBoardingSwiper({
  slides,
  onGetStarted,
}: {
  slides: {
    key: string;
    title: string;
    text: string;
    image: any;
  }[];
  onGetStarted?: () => void;
}) {
  return (
    <Swiper
      loop={false}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      {slides.map((slide) => (
        <SlideContent
          key={slide.key}
          slide={slide}
          isLast={slide.key === "3"}
          onPress={onGetStarted}
        />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    marginBottom: 40,
  },
  activeDot: {
    backgroundColor: "#007BFF",
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    marginBottom: 40,
  },
});
