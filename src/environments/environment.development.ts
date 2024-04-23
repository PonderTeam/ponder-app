export const environment = {
  production: false,
  useFirebase: false,  // change to switch between json server or firebase
  useTypesense: false,
  firebaseConfig: {
    apiKey: "AIzaSyAe-LRL9nl_QioUv8HnPjF-gr7X-ccurcY",
    authDomain: "ponder-hosting.firebaseapp.com",
    projectId: "ponder-hosting",
    storageBucket: "ponder-hosting.appspot.com",
    messagingSenderId: "153886428628",
    appId: "1:153886428628:web:338f9695d9d07707af9a41",
    measurementId: "G-5SST355B0D"
  },
  typesenseConfig: {
    host: "eufokwas6jrghymzp-1.a1.typesense.net",
    port: 443,
    protocol: "https",
    searchApiKey: "dCFeImcoTFKxMh1TelD44Bc4dYePKqPU"
  }
};
