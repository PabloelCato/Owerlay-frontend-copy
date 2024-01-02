//TODO: Replace mock uploadPhotos function to handle photo upload to backend
import { ACCEPTED_FILES, maxFileSize } from '@/constants';

export const uploadPhotos = async (files: UploadFile[]) => {
  try {
    await new Promise(resolve => {
      for (const file of files) {
        const sizeInMb = file.data.size / 1024 ** 2;
        if (sizeInMb > maxFileSize) {
          throw new Error(`Photo size exceeds ${maxFileSize} MB`, {
            cause: 'MaxFileSizeExceeds',
          });
        }
        if (!ACCEPTED_FILES.includes(file.data.name.split('.')[1])) {
          throw new Error('Incorrect file type', {
            cause: 'IncorrectFileType',
          });
        }
      }
      setTimeout(resolve, 1000);
    });
    return { ok: true };
  } catch (error) {
    throw error;
  }
};
