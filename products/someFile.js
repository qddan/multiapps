const ANDROID_BUILD = [
  'rm -rf node_modules',
  'rm -f yarn.lock',
  'yarn cache clean',
  'watchman watch-del-all',
  'yarn install --verbose --cache-min 9999',
  'rm -rf bundle',
  'mkdir bundle && cd bundle && mkdir android && mkdir source_map && cd ..',
  `react-native bundle --platform android --dev false --entry-file index.js --bundle-output bundle/android/main.jsbundle --assets-dest bundle/android
./node_modules/hermes-engine/osx-bin/hermes -emit-binary -O -out bundle/android/main.jsbundle bundle/android/main.jsbundle -output-source-map -w
mv bundle/android/main.jsbundle.map bundle/source_map/main.jsbundle.map`,
  'cd bundle &&  zip -r -X android.zip android',
];

const IOS_BUILD = [
  'rm -rf node_modules',
  'rm -f yarn.lock',
  'yarn cache clean',
  'watchman watch-del-all',
  'yarn install --verbose --cache-min 9999',
  'rm -rf bundle && mkdir bundle && cd bundle && mkdir ios && cd ..',
  'react-native bundle --platform ios --dev false --entry-file index.js --bundle-output bundle/ios/main.jsbundle --assets-dest bundle/ios',
  'cd bundle && zip -r -X ios.zip ios',
];

module.exports = {
  ANDROID_BUILD,
  IOS_BUILD,
};
