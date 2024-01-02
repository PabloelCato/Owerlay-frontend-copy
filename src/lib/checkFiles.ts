import { ACCEPTED_FILES, maxFileSize } from '@/constants';

export const checkFile = (file: File) => {
  const sizeInMb = file.size / 1024 ** 2;

  return {
    correctFileSize: sizeInMb <= maxFileSize,
    correctFileType: ACCEPTED_FILES.includes(file.name.split('.')[1]),
  };
};
