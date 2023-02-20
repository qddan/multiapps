import {AppRegistry, Platform} from 'react-native';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {name as appName} from './app.json';
import {Root} from './Root';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const remoteUrl = `https://super-fast.s3.ap-southeast-1.amazonaws.com/apps/products/${Platform.OS}/remotes`;
const remoteUrl = 'http://localhost:9000';
const remoteUrlHost = 'http://localhost:8081';
// const remoteUrl = `${RNFS.DocumentDirectoryPath}/products/${Platform.OS}/remotes`;

const resolveURL = Federated.createURLResolver({
  containers: {
    products: `${remoteUrl}/[name][ext]`,
    host: `${remoteUrlHost}/[name][ext]`,
  },
});

ScriptManager.shared.setStorage(AsyncStorage);

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  console.log({scriptId, caller, url});

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => Root);
