import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <>
      <View>
        <Link href="/" style={{ padding: 20, fontSize: 18 }}>
          Go to Onboarding
        </Link>
      </View>
    </>
  );
}
