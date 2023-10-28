// Function to open the IndexedDB database
export async function openIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('chatFiles', 1); // Replace with your actual database name and version
  
      request.onerror = (event) => {
        reject(request.error);
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('groupStore')) {
                db.createObjectStore('groupStore');
            }
        };
    });
}
  
export async function getFileFromIndexedDB(messageId) {
    const messageIdString = JSON.stringify(messageId);
    try {
        const db = await openIndexedDB();
        const transaction = db.transaction('groupStore', 'readonly');
        const objectStore = transaction.objectStore('groupStore');
        const request = objectStore.get(messageIdString);
  
        return new Promise((resolve, reject) => {
            request.onsuccess = function (event) {
                const file = request.result;
                if (file) {
                    resolve(file); // Resolve with the file object
                } else {
                    resolve(null); // Resolve with null if the file doesn't exist
                }
            };

            request.onerror = function (event) {
                console.error('Error checking IndexedDB:', event.target.error);
                reject(event.target.error); // Reject with the error if any
            };
        });
    } 
    catch (error) {
        console.error('Error checking IndexedDB:', error);
        return null; // Handle errors by returning null
    }
}
