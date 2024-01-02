import React from 'react';
import { maxUploadFiles } from '@/constants';
import { checkFile } from '@/lib/checkFiles';
import { uuidv4 } from '@firebase/util';
import { findErrorType } from '@/lib/findErrorType';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const processFiles = async ({
  filesState,
  processedFiles,
  setStateActionFiles,
  setStateActionUploadErrors,
  setStateActionIncorrectTypes,
  setStateActionIncorrectSize,
  descriptionRef,
  tags,
}: {
  filesState: UploadFile[] | [];
  processedFiles: FileList | File[];
  setStateActionFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setStateActionIncorrectTypes: React.Dispatch<
    React.SetStateAction<UploadFile[]>
  >;
  setStateActionIncorrectSize: React.Dispatch<
    React.SetStateAction<UploadFile[]>
  >;
  setStateActionUploadErrors: React.Dispatch<
    React.SetStateAction<UploadErrorType[]>
  >;
  descriptionRef: React.MutableRefObject<any>;
  tags: string[];
}) => {
  if (processedFiles && processedFiles[0]) {
    const iterations =
      maxUploadFiles - filesState.length >= processedFiles.length
        ? processedFiles.length
        : maxUploadFiles - filesState.length;
    for (let i = 0; i < iterations; i++) {
      const fileCheck = checkFile(processedFiles[i]);
      if (fileCheck.correctFileSize && fileCheck.correctFileType) {
        const base64String = await fileToBase64(processedFiles[i]);
        const base64Image = base64String.split(',')[1];
        const format = processedFiles[i].type.split('/')[1];
        setStateActionFiles(prevState => [
          ...prevState,
          {
            id: uuidv4(),
            data: processedFiles[i],
            base64String: base64Image,
            format: format,
            description: descriptionRef.current
              ? descriptionRef.current.value
              : '',
            tags: tags,
          },
        ]);
      } else if (!fileCheck.correctFileType) {
        setStateActionIncorrectTypes(prevState => [
          ...prevState,
          {
            id: uuidv4(),
            data: processedFiles[i],
          },
        ]);
        setStateActionUploadErrors(prevState => {
          if (prevState.length > 0 && findErrorType(prevState, 'type')) {
            return prevState;
          } else return [...prevState, { errorType: 'type' }];
        });
      } else if (!fileCheck.correctFileSize) {
        setStateActionIncorrectSize(prevState => [
          ...prevState,
          {
            id: uuidv4(),
            data: processedFiles[i],
          },
        ]);
        setStateActionUploadErrors(prevState => {
          if (prevState.length > 0 && findErrorType(prevState, 'size')) {
            return prevState;
          } else return [...prevState, { errorType: 'size' }];
        });
      }
    }
  }
};
