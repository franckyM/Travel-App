import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../constants/Color";
import destinationCategories from "../data/categories";

type Props = {
  onCategoryChanged: (category: string) => void;
};

function CategoryButton({ onCategoryChanged }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<(React.ElementRef<typeof TouchableOpacity> | null)[]>(
    [],
  );
  const [active, setActive] = useState(0);

  const handleCategory = (index: number) => {
    setActive(index);
    const selected = itemRef.current[index];
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });
    onCategoryChanged(destinationCategories[index].title);
  };

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
          marginBottom: 10,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleCategory(index)}
            ref={(el) => {
              if (itemRef.current) {
                itemRef.current[index] = el;
              }
            }}
            key={index}
            style={
              active == index ? styles.categoryBtnActive : styles.categoryBtn
            }
          >
            <MaterialCommunityIcons
              name={item.iconName as any}
              size={20}
              color={active == index ? Colors.white : Colors.black}
            />
            <Text
              style={
                active == index
                  ? styles.categoryBtnTxtActive
                  : styles.categoryBtnTxt
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default CategoryButton;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: Colors.black,
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: Colors.white,
  },
});
