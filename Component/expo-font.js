import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'anton': require('../assets/fonts/Anton-Regular.ttf'),
    'pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
    'lili': require('../assets/fonts/LilitaOne-Regular.ttf'),
    // Add other font variations here if available
  });
};
