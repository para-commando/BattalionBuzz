import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadData = async(file) => {
    const date = new Date()
    const storage = getStorage();
    const storageRef = ref(storage, `images/${date + file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
  return uploadTask.on('state_changed', 
      (snapshot) => {
       
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
       console.log("🚀 ~ uploadData ~ error:", error)
       throw error;
      }, 
      async() => {
       
      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
      console.log("🚀 ~ async ~ downloadUrl:", downloadUrl)
      return downloadUrl;
      }
    );
    
}
