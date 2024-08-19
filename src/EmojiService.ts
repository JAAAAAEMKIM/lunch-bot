const EMOJI =
  "🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫🍝🍆🥔🥕🌽🌶️🫑🥒🥬🥦🧄🧅🥜🫘🌰🫚🫛🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯";

export const getRandomEmoji = (length = 1) => {
  const emojiSegments = [...new Intl.Segmenter().segment(EMOJI)];

  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(emojiSegments[Math.floor(Math.random() * emojiSegments.length)]);
  }
  return arr.map((seg) => seg.segment).join("");
};
