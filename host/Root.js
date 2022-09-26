import * as React from 'react';
import {Text, Platform, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ChunkManager} from '@callstack/repack/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    // const baseUrl = `https://super-fast.s3.ap-southeast-1.amazonaws.com/apps/products/${Platform.OS}`;
    const baseUrl = 'http://localhost:9000';

    switch (parentId) {
      case 'products':
        url = `${baseUrl}/${chunkId}.chunk.bundle`;
        break;

      case 'main':
      default:
        url =
          {
            products: `${baseUrl}/${chunkId}.container.bundle`,
          }[chunkId] ?? `${baseUrl}/${chunkId}.chunk.bundle`;
        break;
    }

    console.log({chunkId, parentId, url});

    return {
      url,
      query: {
        platform: Platform.OS,
      },
      excludeExtension: true,
    };
  },
});

async function loadComponent(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  // Download and execute container
  await ChunkManager.loadChunk(scope, 'main');

  const container = self[scope];

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const exports = factory();
  return exports;
}

const AppProducts = React.lazy(() => loadComponent('products', './App.js'));

function ProductsWrapper({route}) {
  const username = route?.params?.username;

  console.log('ProductsWrapper', {username});

  return (
    <React.Suspense
      fallback={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'white',
          }}>
          <Text style={{textAlign: 'center'}}>Loading...</Text>
        </View>
      }>
      <AppProducts username={username} />
    </React.Suspense>
  );
}

const Stack = createNativeStackNavigator();

export function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={ProductsWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
