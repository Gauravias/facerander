// Object to store data about the face and background
var appearance = {
    eyebrowCurve: [0, 10, 0],
    mouthCurve: 20,
    mouthCurveOffset: 0.5,
    mouthCurveWidth: 5,
    eyeSize: 1,
    pupilSize: 1,
  
    backgroundHue: 0,
    backgroundBrightness: 1.0,
    backgroundBlur: 100
  };
  
  // Object to store information about the robot
  var reactions = {
    default: 'happy',
    onFace: 'excited',
    favColor: 'yellow',
    onFavColor: 'happy',
  };
  
  // Object to store lists of words for bag-of-words sentiment analysis
  var sentenceAnalysis = {
    negativeWords: ['abysmal', 'adverse', 'alarming', 'angry', 'annoy', 'anxious', 'apathy', 'appalling', 'atrocious', 'away', 'awful', 'bad', 'banal', 'barbed', 'belligerent', 'bemoan', 'beneath', 'boring', 'broken', 'callous', "can't", 'clumsy', 'coarse', 'cold', 'cold-hearted', 'collapse', 'confused', 'contradictory', 'contrary', 'corrosive', 'corrupt', 'crazy', 'creepy', 'criminal', 'cruel', 'cry', 'cutting', 'dead', 'decaying', 'damage', 'damaging', 'dastardly', 'deplorable', 'depressed', 'deprived', 'deformed', 'Cont.', 'deny', 'despicable', 'detrimental', 'dirty', 'disease', 'disgusting', 'disheveled', 'dishonest', 'dishonorable', 'dismal', 'distress', "don't", 'dreadful', 'dreary', 'enraged', 'eroding', 'evil', 'fail', 'faulty', 'fear', 'feeble', 'fight', 'filthy', 'foul', 'frighten', 'frightful', 'gawky', 'ghastly', 'grave', 'greed', 'grim', 'grimace', 'gross', 'grotesque', 'gruesome', 'guilty', 'haggard', 'hard', 'hard-hearted', 'harmful', 'hate', 'hideous', 'homely', 'horrendous', 'horrible', 'hostile', 'hurt', 'hurtful', 'icky', 'ignore', 'ignorant', 'ill', 'immature', 'imperfect', 'impossible', 'inane', 'inelegant', 'infernal', 'injure', 'injurious', 'insane', 'insidious', 'insipid', 'jealous', 'junky', 'lose', 'lousy', 'lumpy', 'malicious', 'mean', 'menacing', 'messy', 'misshapen', 'missing', 'misunderstood', 'moan', 'moldy', 'monstrous', 'naive', 'nasty', 'naughty', 'negate', 'negative', 'never', 'no', 'nobody', 'nondescript', 'nonsense', 'noxious', 'objectionable', 'odious', 'offensive', 'old', 'oppressive', 'out', 'pain', 'perturb', 'pessimistic', 'petty', 'plain', 'poisonous', 'poor', 'prejudice', 'questionable', 'quirky', 'quit', 'reject', 'renege', 'repellant', 'reptilian', 'repulsive', 'repugnant', 'revenge', 'revolting', 'rocky', 'rotten', 'rude', 'ruthless', 'sad', 'savage', 'scare', 'scary', 'scream', 'severe', 'shoddy', 'shocking', 'sick', 'sickening', 'sinister', 'slimy', 'smelly', 'sobbing', 'sorry', 'spiteful', 'sticky', 'stinky', 'stormy', 'stressful', 'stuck', 'stupid', 'substandard', 'suspect', 'suspicious', 'tense', 'terrible', 'terrifying', 'threatening', 'ugly', 'undermine', 'unfair', 'unfavorable', 'unhappy', 'unhealthy', 'unjust', 'unlucky', 'unpleasant', 'upset', 'unsatisfactory', 'unsightly', 'untoward', 'unwanted', 'unwelcome', 'unwholesome', 'unwieldy', 'unwise', 'upset', 'vice', 'vicious', 'vile', 'villainous', 'vindictive', 'wary', 'weary', 'wicked', 'woeful', 'worthless', 'wound', 'yell', 'yucky', 'zero'],
    positiveWords: ['absolutely', 'adorable', 'accepted', 'acclaimed', 'accomplish', 'accomplishment', 'achievement', 'action', 'active', 'admire', 'adventure', 'affirmative', 'affluent', 'agree', 'agreeable', 'amazing', 'angelic', 'appealing', 'approve', 'aptitude', 'attractive', 'awesome', 'beaming', 'beautiful', 'believe', 'beneficial', 'bliss', 'bountiful', 'bounty', 'brave', 'bravo', 'brilliant', 'bubbly', 'calm', 'celebrated', 'certain', 'champ', 'champion', 'charming', 'cheery', 'choice', 'classic', 'classical', 'clean', 'commend', 'composed', 'congratulation', 'constant', 'cool', 'courageous', 'creative', 'cute', 'dazzling', 'delight', 'delightful', 'distinguished', 'divine', 'earnest', 'easy', 'ecstatic', 'effective', 'effervescent', 'efficient', 'effortless', 'electrifying', 'elegant', 'enchanting', 'encouraging', 'endorsed', 'energetic', 'energized', 'engaging', 'enthusiastic', 'essential', 'esteemed', 'ethical', 'excellent', 'exciting', 'exquisite', 'fabulous', 'fair', 'familiar', 'famous', 'fantastic', 'favorable', 'fetching', 'fine', 'fitting', 'flourishing', 'fortunate', 'free', 'fresh', 'friendly', 'fun', 'funny', 'generous', 'genius', 'genuine', 'giving', 'glamorous', 'glowing', 'good', 'gorgeous', 'graceful', 'great', 'green', 'grin', 'growing', 'handsome', 'happy', 'harmonious', 'healing', 'healthy', 'hearty', 'heavenly', 'honest', 'honorable', 'honored', 'hug', 'idea', 'ideal', 'imaginative', 'imagine', 'impressive', 'independent', 'innovate', 'innovative', 'instant', 'instantaneous', 'instinctive', 'intuitive', 'intellectual', 'intelligent', 'inventive', 'jovial', 'joy', 'jubilant', 'keen', 'kind', 'knowing', 'knowledgeable', 'laugh', 'legendary', 'light', 'learned', 'lively', 'lovely', 'lucid', 'lucky', 'luminous', 'marvelous', 'masterful', 'meaningful', 'merit', 'meritorious', 'miraculous', 'motivating', 'moving', 'natural', 'nice', 'novel', 'now', 'nurturing', 'nutritious', 'okay', 'one', 'one-hundred', 'percent', 'open', 'optimistic', 'paradise', 'perfect', 'phenomenal', 'pleasurable', 'plentiful', 'pleasant', 'poised', 'polished', 'popular', 'positive', 'powerful', 'prepared', 'pretty', 'principled', 'productive', 'progress', 'prominent', 'protected', 'proud', 'quality', 'quick', 'quiet', 'ready', 'reassuring', 'refined', 'refreshing', 'rejoice', 'reliable', 'remarkable', 'resounding', 'respected', 'restored', 'reward', 'rewarding', 'right', 'robust', 'safe', 'satisfactory', 'secure', 'seemly', 'simple', 'skilled', 'skillful', 'smile', 'soulful', 'sparkling', 'special', 'spirited', 'spiritual', 'stirring', 'stupendous', 'stunning', 'success', 'successful', 'sunny', 'super', 'superb', 'supporting', 'surprising', 'terrific', 'thorough', 'thrilling', 'thriving', 'tops', 'tranquil', 'transforming', 'transformative', 'trusting', 'truthful', 'unreal', 'unwavering', 'up', 'upbeat', 'upright', 'upstanding', 'valued', 'vibrant', 'victorious', 'victory', 'vigorous', 'virtuous', 'vital', 'vivacious', 'wealthy', 'welcome', 'well', 'whole', 'wholesome', 'willing', 'wonderful', 'wondrous', 'worthy', 'wow', 'yes', 'yummy', 'zeal', 'zealous'],
    stopWords: ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]
  };
  
  // Function to pick a random "good" emotion
  function randomGood() {
    var goodLst = ['happy','excited'];
    var good = goodLst[rndm(0,goodLst.length-1)];
    while (lastEmotion == good) {
      good = goodLst[rndm(0,goodLst.length-1)];
    }
    return good;
  }
  
  // Function to pick a random "bad" emotion
  function randomBad() {
    var badLst = ['worried','embarrassed','angry','sad'];
    var bad = badLst[rndm(0,badLst.length-1)];
    while (lastEmotion == bad) {
      bad = badLst[rndm(0,badLst.length-1)];
    }
    return bad;
  }
  
  // Function to generate a random number in a range
  function rndm(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to update the face and background parameters based on the current emotion with lerp
  // Eventually there might be a way to have a user use a UI to set the parameters for each emotion
  function emotion(emotion) {
    switch (emotion) {
      case "happy":
        arrayLerp(appearance.eyebrowCurve, [0, 10, -10]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, 20, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.5, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 5, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 1, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 1, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, 60, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          5,
          0.1
        );
        break;
      case "sad":
        arrayLerp(appearance.eyebrowCurve, [0, -10, -9]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, -20, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.5, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 5, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 1.2, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 1.8, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, 190, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          1.7,
          0.1
        );
        break;
      case "excited":
        arrayLerp(appearance.eyebrowCurve, [20, 20, 15]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, 20, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.5, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 5, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 1.2, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 1.4, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, 30, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          9,
          0.1
        );
        break;
      case "angry":
        arrayLerp(appearance.eyebrowCurve, [-20, 0, 7]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, -14, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.35, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 6, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 0.9, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 0.8, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, 10, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          15,
          0.1
        );
        break;
      case "worried":
        arrayLerp(appearance.eyebrowCurve, [15, -7, -9]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, -6, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.36, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 5, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 1.1, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 1, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, -80, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          2,
          0.1
        );
        break;
      case "embarrassed":
        arrayLerp(appearance.eyebrowCurve, [9, 5, -10]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, 15, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.85, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 10, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 0.8, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 0.5, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, -20, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          5,
          0.1
        );
        break;
    
      // Default is the same as happy
      default:
        arrayLerp(appearance.eyebrowCurve, [0, 10, -10]);
        appearance.mouthCurve = lerp(appearance.mouthCurve, 20, 0.1);
        appearance.mouthCurveOffset = lerp(appearance.mouthCurveOffset, 0.5, 0.1);
        appearance.mouthCurveWidth = lerp(appearance.mouthCurveWidth, 5, 0.1);
        appearance.eyeSize = lerp(appearance.eyeSize, 1, 0.1);
        appearance.pupilSize = lerp(appearance.pupilSize, 1, 0.1);
        appearance.backgroundHue = lerp(appearance.backgroundHue, 60, 0.1);
        appearance.backgroundBrightness = lerp(
          appearance.backgroundBrightness,
          5,
          0.1
        );
        break;
    }
  }
  