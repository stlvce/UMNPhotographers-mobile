import { StyleSheet, View } from "react-native";
import { MD3Colors, ProgressBar, Text } from "react-native-paper";

const LevelBar = ({ level }) => {
  const floatLevel = level / 10;

  const levelColor = (value) => {
    if (value < 0.4) {
      return "#39d039";
    }

    if (value >= 0.4 && value <= 0.7) {
      return "rgba(238,238,47,0.98)";
    }

    if (value > 0.7) {
      return MD3Colors.error60;
    }

    return MD3Colors.primary70;
  };

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.flexRow}>
        <Text style={styles.propertyTitle} variant="bodyMedium">
          Сложность
        </Text>
        <Text style={styles.levelCount} variant="bodyMedium">
          {level}
        </Text>
      </View>

      <ProgressBar progress={floatLevel} color={levelColor(floatLevel)} />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarContainer: {
    gap: 7,
  },
  propertyTitle: {
    opacity: 0.7,
  },
  levelCount: {
    alignSelf: "flex-end",
  },
});

export default LevelBar;
