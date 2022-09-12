import * as React from 'react';
import {
  AppRegistry,
  Text,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {ChunkManager} from '@callstack/repack/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    console.log({chunkId, parentId});

    switch (parentId) {
      case 'products':
        url = `http://localhost:9000/${chunkId}.chunk.bundle`;
        break;
      // case 'app2':
      //   url = `http://localhost:9001/${chunkId}.chunk.bundle`;
      //   break;
      // case 'app3':
      //   url = `http://localhost:9002/${chunkId}.chunk.bundle`;
      //   break;

      case 'main':
      default:
        url =
          {
            // containers
            products:
              'https://storage.googleapis.com/online-dev-public/mobile-dong%2F2022%2FSeptember%2F12%2F%5Ba1b5db63-22f9-4c94-b19e-fcc65da8b53b%5Dproducts.container.bundle',
            // products: 'http://localhost:9000/products.container.bundle',
            // app3: 'http://localhost:9002/app3.container.bundle',
          }[chunkId] ?? `http://localhost:8081/${chunkId}.chunk.bundle`;
        break;
    }

    console.log({url});

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

// const App2 = React.lazy(() => loadComponent('app2', './App.js'));

// const App3 = React.lazy(() => loadComponent('app3', './App.js'));

function ProductsWrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{textAlign: 'center'}}>Loading...</Text>}>
      <AppProducts />
    </React.Suspense>
  );
}

// function App2Wrapper() {
//   return (
//     <React.Suspense
//       fallback={<Text style={{textAlign: 'center'}}>Loading...</Text>}>
//       <App2 />
//     </React.Suspense>
//   );
// }

// function App3Wrapper() {
//   return (
//     <React.Suspense
//       fallback={<Text style={{textAlign: 'center'}}>Loading 3...</Text>}>
//       <App3 />
//     </React.Suspense>
//   );
// }

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  const gotoProducts = () => {
    navigation.navigate('Products');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          margin: 10,
          borderRadius: 5,
        }}
        onPress={gotoProducts}>
        <Text style={{color: 'white'}}>Go to Products</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductsWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
