import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const pickFile = async (options) => {
  const result = await DocumentPicker.getDocumentAsync(options);
  console.log(result,":::::::::::::::::::::::::::")
  if(result.canceled )
  return {canceled:true}
  
  if(options.multiple)
  return {
    results: result.assets.map(item => {
      return { name: item.uri.split("/").pop(), uri: item.uri }
    }),
    canceled: result.canceled
  }
    return {
      name: result.assets[0].uri.split('/').pop(),
      uri: result.assets[0].uri,
      canceled:result.canceled
    };
    
};

const pickImage = async (options) => {
  const imageOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    ...options,
  };
  const result = await ImagePicker.launchImageLibraryAsync(imageOptions);
console.log(result);
if(result.canceled)
return {canceled:true}
  return {
    name: result.assets[0].uri.split('/').pop(),
    uri: result.assets[0].uri,
    canceled:result.canceled
  };
};

const pickVideo = async (options) => {
  const videoOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    ...options,
  };
  const result = await ImagePicker.launchImageLibraryAsync(videoOptions);

  if(result.canceled)
  return {canceled:true}
    return {
      name: result.assets[0].uri.split('/').pop(),
      uri: result.assets[0].uri,
      canceled:result.canceled
    };
};

// Example of using the functions:

const handleImageSelection = async () => {
  const options = {
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  };

  const { fileName, fileData } = await pickImage(options);

  if (!fileData.canceled) {
    setFile(fileData.uri);
    console.log(`Selected Image - FileName: ${fileName}, URI: ${fileData.uri}`);
  }
};

const handleVideoSelection = async () => {
  const options = {
    allowsEditing: false,
    quality: 1,
  };

  const { fileName, fileData } = await pickVideo(options);

  if (!fileData.canceled) {
    setFile(fileData.uri);
    console.log(`Selected Video - FileName: ${fileName}, URI: ${fileData.uri}`);
  }
};

const handleFileSelection = async () => {
  const options = {
    type: '*/*', // All file types
  };

  const { fileName, fileData } = await pickFile(options);

  if (!fileData.canceled) {
    // Handle the selected file
    console.log(`Selected File - FileName: ${fileName}, URI: ${fileData.uri}`);
  }
};
export {pickFile,pickImage,pickVideo}