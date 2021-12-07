import storage from '@react-native-firebase/storage';

export default file => onSccess => onError => {
  console.log('IMG FILE.', file);
  const path = `contact-pictures/user/777/${
    file.filename || file.creationDate
  }`;
  const ref = storage().ref(path);

  const task = ref.putFile(file.path);

  task
    .then(async () => {
      const url = await ref.getDownloadURL();
      console.log('URL after download', url);
      onSccess(url);
    })
    .catch(err => {
      onError(err);
    });
};
