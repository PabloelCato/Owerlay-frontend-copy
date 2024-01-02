export {};

declare global {
  interface User {
    displayName: string;
    email: string;
    photoURL?: string;

    bio?: string;
    place?: string;
    loggedIn: boolean;
    loggedIn: boolean;
  }

  interface MessageBanners {
    information?: { info: string };
    uploaded?: { success: string };
    noFiles?: { warning: string };
    uploadError?: { error: string };
  }

  interface UploadFile {
    id: string;
    tags?: string[];
    description?: string;
    data: File;
  }

  interface UploadErrorType {
    errorType: 'size' | 'type';
  }

  interface GalleryItem {
    id: string;
    img: string;
    author: string;
  }
}
