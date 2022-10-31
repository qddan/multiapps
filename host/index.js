import {AppRegistry, Platform} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {name as appName} from './app.json';
import {Root} from './Root';

const remoteUrl = `https://super-fast.s3.ap-southeast-1.amazonaws.com/apps/products/${Platform.OS}/remotes`;
// const remoteUrl = 'http://localhost:9000';
// const remoteUrl = `${RNFS.DocumentDirectoryPath}/products/${Platform.OS}/remotes`;

const resolveURL = Federated.createURLResolver({
  containers: {
    products: `${remoteUrl}/[name][ext]`,
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  console.log(JSON.stringify({scriptId, caller, url}));

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
