import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const addImage = (
  refImageModal: any,
  callback: any,
  callbackError: any,
) => {
  let temp: any;
  try {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 700,
        maxWidth: 700,
      },
      (resp: any) => {
        // console.log("resp ADD IMAGE", resp);
        try {
          const pic = resp.assets[0];
          temp = {
            uri: pic.uri,
            type: pic.type,
            name: pic.fileName,
          };
          callback(temp);
        } catch (error) {
          console.log('error set image', error);
          callbackError(error);
        }
      },
    );
  } catch (error) {
    console.log('error get image', error);
  }
  refImageModal?.current?.close();
};
export const takeImage = (
  refImageModal: any,
  callback: any,
  callbackError: any,
) => {
  let temp: any;
  try {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 700,
        maxWidth: 700,
      },
      (resp: any) => {
        // console.log("resp ADD IMAGE", resp);
        try {
          const pic = resp.assets[0];
          temp = {
            uri: pic.uri,
            type: pic.type,
            name: pic.fileName,
          };
          callback(temp);
        } catch (error) {
          console.log('error set image', error);
        }
      },
    );
  } catch (error) {
    console.log('error get image', error);
    callbackError(error);
  }
  refImageModal?.current?.close();
};
