const REDHIO_API_URL = __REDHIO_API_URL__;

function createBlob(parts, options) {
  options = options || {};
  if (typeof options === 'string') {
    options = { type: options };
  }
  return new Blob(parts, options);
}

function arrayBufferToBlob(buffer, type) {
  return Promise.resolve().then(function () {
    return createBlob([buffer], type);
  });
}

 export function classifyImage(imageSrc) {
   const promise = new Promise((resolve, reject) => {
     const xhr = new XMLHttpRequest();
     xhr.open('POST', REDHIO_API_URL + 'classify', true);
     xhr.onload = (e) => {
       // Uploaded successfully
       const response = JSON.parse(xhr.responseText);
       resolve(response);
     };

     xhr.onerror = () => {
       reject(xhr.responseText);
     };

     if (typeof imageSrc === 'string') {
       const binaryString = window.atob(imageSrc.substring(imageSrc.indexOf(',') + 1, imageSrc.length));
       const fileType = imageSrc.substring(imageSrc.indexOf(':') + 1, imageSrc.indexOf(';'));
       const len = binaryString.length;
       const bytes = new Uint8Array(len);
       for (let i = 0; i < len; i++) {
         bytes[i] = binaryString.charCodeAt(i);
       }
       arrayBufferToBlob(bytes.buffer, fileType).then((blob) => {
         console.log(blob);
         xhr.send(blob);
       }).catch((error) => {
         reject(error);
       });
     } else {
       xhr.setRequestHeader("Content-Type", imageSrc.type);
       xhr.overrideMimeType("application/json");
       xhr.send(imageSrc);

       // const fileReader = new FileReader();
       // fileReader.onloadend = function(e) {
       //   const arrayBuffer = e.target.result;
       //   const fileType = imageSrc.type;
       //   arrayBufferToBlob(arrayBuffer, fileType).then((blob) => {
       //     console.log(blob);
       //     xhr.send(blob);
       //   }).catch((error) => {
       //     reject(error);
       //   });
       // };
       // fileReader.readAsArrayBuffer(imageSrc);
     }
   });

   return promise;
 }

//export function classifyImage(imageSrc) {
  // TODO: delete this function and uncomment function above
  // It hasn't been tested since CORS was not allowed
//  return Promise.resolve([
//    { 'confidence' : 0.5306, 'label' : 'SANDBAR' },
//    { 'confidence' : 0.0717, 'label' : 'KELPIE' },
//    { 'confidence' : 0.0643, 'label' : 'CHIHUAHUA' }
//  ]);
//}
