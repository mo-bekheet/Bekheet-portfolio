// Asset service for handling file uploads to Firebase Storage
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../lib/firebase';

// Upload file to Firebase Storage
export const uploadFile = async (file, folderPath = 'assets') => {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `${folderPath}/${Date.now()}_${file.name}`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      downloadURL,
      fileName: file.name,
      fullPath: snapshot.ref.fullPath,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (files, folderPath = 'assets') => {
  const uploadPromises = Array.from(files).map(file => 
    uploadFile(file, folderPath)
  );
  
  return await Promise.all(uploadPromises);
};

// Get download URL for a file path
export const getFileURL = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(fileRef);
    
    return {
      success: true,
      downloadURL
    };
  } catch (error) {
    console.error('Error getting file URL:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Utility function to validate file before upload
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
  } = options;
  
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`
    };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  return {
    valid: true
  };
};

// Utility function to format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};