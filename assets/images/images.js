
const androidRatingPrefix = './yelp_stars/android/small/stars_small_',
      iosRatingPrefix = './yelp_stars/web_and_ios/small/small_';

const images = {
  ratings: {
    android: {
      0: require(`${androidRatingPrefix}0.png`),
      1: require(`${androidRatingPrefix}1.png`),
      1.5: require(`${androidRatingPrefix}1_half.png`),
      2: require(`${androidRatingPrefix}2.png`),
      2.5: require(`${androidRatingPrefix}2_half.png`),
      3: require(`${androidRatingPrefix}3.png`),
      3.5: require(`${androidRatingPrefix}3_half.png`),
      4: require(`${androidRatingPrefix}4.png`),
      4.5: require(`${androidRatingPrefix}4_half.png`),
      5: require(`${androidRatingPrefix}5.png`)
    },
    ios: {
      0: require(`${iosRatingPrefix}0.png`),
      1: require(`${iosRatingPrefix}1.png`),
      1.5: require(`${iosRatingPrefix}1_half.png`),
      2: require(`${iosRatingPrefix}2.png`),
      2.5: require(`${iosRatingPrefix}2_half.png`),
      3: require(`${iosRatingPrefix}3.png`),
      3.5: require(`${iosRatingPrefix}3_half.png`),
      4: require(`${iosRatingPrefix}4.png`),
      4.5: require(`${iosRatingPrefix}4_half.png`),
      5: require(`${iosRatingPrefix}5.png`),
    }
  }
};

export default images;