const EXPRESSION_TO_MOOD = {
  "😊 Happy": "happy",
  "😢 Sad": "sad",
  "😠 Angry": "angry",
  "😮 Surprised": "surprised",
  "😐 Neutral": "neutral",
};

export function mapExpressionToMood(expression) {
  return EXPRESSION_TO_MOOD[expression] || null;
}