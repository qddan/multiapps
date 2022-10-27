import * as React from 'react';
import {Text, Platform, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ChunkManager} from '@callstack/repack/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../container/LoginScreen';
import HomeScreen from '../container/HomeScreen';
import Loading from '../components/Loading';
import * as RNFS from 'react-native-fs';
import {unzip} from 'react-native-zip-archive';

// ChunkManager.configure({
//   forceRemoteChunkResolution: true,
//   resolveRemoteChunk: async (chunkId, parentId) => {
//     let url;

//     // const remoteUrl = `https://super-fast.s3.ap-southeast-1.amazonaws.com/apps/products/${Platform.OS}`;
//     const remoteUrl = `${RNFS.DocumentDirectoryPath}/products/${Platform.OS}`;

//     switch (parentId) {
//       case 'products':
//         url = `${remoteUrl}/${chunkId}.chunk.bundle`;
//         break;

//       case 'main':
//       default:
//         url =
//           {
//             products: `${remoteUrl}/${chunkId}.container.bundle`,
//           }[chunkId] ?? `${remoteUrl}/${chunkId}.chunk.bundle`;
//         break;
//     }

//     console.log({parentId, chunkId, url});

//     return {
//       url,
//       query: {
//         platform: Platform.OS,
//       },
//       excludeExtension: true,
//     };
//   },
// });

// const downloadZipApp = async appName => {
//   const fileUri = `https://super-fast.s3.ap-southeast-1.amazonaws.com/apps/${appName}/${Platform.OS}.zip`;

//   const pathStorage = `${RNFS.DocumentDirectoryPath}/${appName}`;
//   const sourcePath = `${pathStorage}.zip`;
//   const targetPath = `${pathStorage}`;
//   const charset = 'UTF-8';

//   const downloadOptions = {
//     fromUrl: fileUri,
//     toFile: sourcePath,
//   };

//   RNFS.downloadFile(downloadOptions)
//     .promise.then(result => {
//       console.log('download-result', result);
//       unzip(sourcePath, targetPath, charset)
//         .then(path => {
//           console.log('unzip-path', path);
//           // return loadComponent('products', './App.js');
//         })
//         .catch(error => {
//           console.error('unzip', error);
//         });
//     })
//     .catch(error => {
//       console.log('downloadFile', error);
//     });
// };

// async function loadComponent(scope, module) {
//   // Initializes the share scope. This fills it with known provided modules from this build and all remotes
//   await __webpack_init_sharing__('default');
//   // Download and execute container
//   await ChunkManager.loadChunk(scope, 'main');

//   const container = self[scope];

//   // Initialize the container, it may provide shared modules
//   await container.init(__webpack_share_scopes__.default);
//   const factory = await container.get(module);
//   const exports = factory();
//   return exports;
// }

const AppProducts = React.lazy(() =>
  Federated.importModule('products', './App'),
);

function ProductsWrapper({route}) {
  const username = route?.params?.username;

  return (
    <React.Suspense fallback={<Loading />}>
      <AppProducts username={username} />
    </React.Suspense>
  );
}

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AppProducts" component={ProductsWrapper} />
    </Stack.Navigator>
  );
};

export function App() {
  React.useEffect(() => {
    // downloadZipApp('products');
  }, []);

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
