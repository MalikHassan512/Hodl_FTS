import Toast from "react-native-toast-message"
// import API_URLS from "../API/USER/URLS";
import mime from "mime"
import { Platform } from "react-native"
import RNFetchBlob from "rn-fetch-blob"
import * as FileSystem from "expo-file-system"
// import { shareAsync } from 'expo-sharing';

// export function JsonToQueryString(json) {
//     // remove null values
//     Object.keys(json).forEach(function (key) {
//         if (json[key] === null || json[key] === undefined) {
//             delete json[key];
//         }
//     });
//     return '?' +
//         Object.keys(json).map(function (key) {
//             return encodeURIComponent(key) + '=' +
//                 encodeURIComponent(json[key]);
//         }).join('&');
// }

// export function getUrl(uri) {

//     try {
//         if (uri === null || uri === undefined) {
//             return {
//                 uri:"https://kdr-storage.s3.amazonaws.com/media/default.png"
//             };
//         }
//         if (uri.startsWith("/")) {
//             uri = uri.substring(1);
//         }

//         return uri.includes("http") ?
//             {
//                 uri: uri
//             } :
//             {
//                 uri: API_URLS.images + uri
//             }

//     }catch (E){
//         return {
//             uri:"https://kdr-storage.s3.amazonaws.com/media/default.png"
//         }
//     }

// }

// export const getImageUrl = (uri) => {
//     let file = {
//         uri: uri,
//         name: uri.split("/").pop(),
//         type: mime.getType(uri)
//     }
//     return file
// }

// export function getRandColor() {

//     return "#"+((1<<24)*Math.random()|0).toString(16)
// }

export function getFileNameFromURL(url) {
  const parts = url.split("/")
  return parts[parts.length - 1]
}
var basePath =
  Platform.OS === "android"
    ? `${RNFetchBlob.fs.dirs.DownloadDir}/hodl`
    : `${RNFetchBlob.fs.dirs.DocumentDir}/hodl`

const saveToDevice = async (file, overide = true) => {
  const filename = getFileNameFromURL(file)

  if (!overide) {
    const downloadPath = `${basePath}/${filename}`
    const fileExists = await RNFetchBlob.fs.exists(downloadPath)
    if (fileExists) return
  }
  downloadFile(file, filename)
}

const downloadFile = async (url, fileName) => {
  try {
    const downloadPath = `${basePath}/${fileName}`

    console.log("downloadPath", downloadPath)
    const response = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloadPath,
        description: "File downloaded via app"
      },
      IOSBackgroundTask: true,
      IOSDownloadTask: true,
      path: downloadPath
    }).fetch("GET", url)

    // Check if the file was downloaded successfully by checking its existence
    const fileExists = await RNFetchBlob.fs.exists(downloadPath)

    if (fileExists) {
      console.log("File downloaded successfully")
      // You can do something here after successful download
    } else {
      console.log("Failed to download the file")
      // Handle the download failure
    }
  } catch (error) {
    console.error("Error occurred while downloading:", error)
    // Handle errors during the download process
  }
}

const save = async (uri, filename, mimetype) => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      })
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype
      )
        .then(async uri => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64
          })
        })
        .catch(e => console.log(e))
    } else {
      shareAsync(uri)
    }
  } else {
    shareAsync(uri)
  }
}
export { saveToDevice }
// export default getCurrentLocation;
