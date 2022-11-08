// import AppLoading from 'expo-app-loading';  //deprecated
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // AppLoading is deprecated
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { Appearance } from 'react-native';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CachePersistor, persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist'; //local에 데이터 저장
import Persistor from 'apollo3-cache-persist/lib/Persistor';

SplashScreen.preventAutoHideAsync();

export default function App() {


  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    function preloadAsset() {
      const fontToLoad = [Ionicons.font];
      const fontPromises = fontToLoad.map(font => Font.loadAsync(font));
      const imagesToLoad = [require('./assets/Instagram-logo.png'), "https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"];
      const imagePromises = imagesToLoad.map(img => Asset.loadAsync(img));
      return Promise.all([...fontPromises, ...imagePromises]);
    }

      const persistor = new CachePersistor({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
          //serialize:false,// gql Query 변경 시 , cache 데이터 충돌 하기때문에 false //작동 안함
        });

    async function preload() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }

        await persistor.purge();

        await persistCache({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
          //serialize:true, //#17.1 Likes part Two Cache 문제 발생 시 // false 사용이 안됨
        });

        

        await preloadAsset();
      }
      catch (e) {
        console.warn(e);
      }
      finally {
        setLoading(false);
      }
    }
    preload();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);


  if (loading) {
    return null;
  }

  const subScription = Appearance.addChangeListener(({ colorScheme }) => {

  });



  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </View>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
