import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'modal-font': require('../assets/Fonts/Montserrat-Bold.ttf'),
    'custom-font': require('../assets/Fonts/Lato-Italic.ttf'),
    'titre-font': require('../assets/Fonts/Montserrat-Black.ttf'),
    'nomrencotre-font': require('../assets/Fonts/Lato-Bold.ttf'),
    'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf'),
    'title-font': require('../assets/Fonts/RobotoCondensed-BlackItalic.ttf'),
    'objectif-font': require('../assets/Fonts/GrandHotel-Regular.ttf'),
  });
};

export default loadFonts;
