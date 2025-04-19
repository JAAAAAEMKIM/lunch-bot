const EMOJI = process.env.FOOD_EMOJI || 
  "🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫🍝🍆🥔🥕🌽🌶️🫑🥒🥬🥦🧄🧅🥜🫘🌰🫚🫛🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯";

/**
 * 랜덤 음식 이모지를 생성하는 유틸리티 함수
 * @param length 생성할 이모지 개수
 * @returns 랜덤 이모지 문자열
 */
export const getRandomEmoji = (length = 1) => {
  const emojiSegments = [...new Intl.Segmenter().segment(EMOJI)];

  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(emojiSegments[Math.floor(Math.random() * emojiSegments.length)]);
  }
  return arr.map((seg) => seg.segment).join("");
};