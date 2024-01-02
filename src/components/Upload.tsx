'use client';

import React, { useRef, useState } from 'react';
import {
  ACCEPTED_FILES,
  btnOutlinedStyle,
  btnPrimaryStyle,
  colors,
  mainContentMaxWidth,
} from '@/constants';
import { Box, Button, Input, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Confirm from '@/components/Confirm';
import UploadImagePreview from '@/components/UploadImagePreview';
import UploadCta from '@/components/UploadCta';
import MessageBanners from '@/components/MessageBanners';
import UploadError from '@/components/UploadError';
import { findErrorType } from '@/lib/findErrorType';
import useMediaQuery from '@mui/material/useMediaQuery';
import UploadTextField from '@/components/UploadTextField';
import UploadTagsField from '@/components/UploadTagsField';
import { processFiles } from '@/lib/processFiles';
import { auth } from '@/lib/firebase';

const Upload = ({
  cancelAction,
  openConfirm,
  openConfirmAction,
  closeModal,
}: {
  cancelAction: () => void;
  openConfirm: boolean;
  openConfirmAction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageBanners>({});
  const [uploadErrors, setUploadErrors] = useState<UploadErrorType[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const inputRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [incorrectTypeFiles, setIncorrectTypeFiles] = useState<UploadFile[]>(
    [],
  );
  const [incorrectSizeFiles, setIncorrectSizeFiles] = useState<UploadFile[]>(
    [],
  );
  const theme = useTheme();
  const flashMessage = (message: MessageBanners) => {
    setMessages(prevState => {
      return { ...prevState, ...message };
    });
    setShowMessages(true);
    setTimeout(() => {
      setMessages({});
      setShowMessages(false);
    }, 3000);
  };
  const handleDragEnter = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = async (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    await processFiles({
      filesState: files,
      processedFiles: e.dataTransfer.files,
      setStateActionFiles: setFiles,
      setStateActionUploadErrors: setUploadErrors,
      setStateActionIncorrectSize: setIncorrectSizeFiles,
      setStateActionIncorrectTypes: setIncorrectTypeFiles,
      descriptionRef: descriptionRef,
      tags: tags,
    });
    const newLocations = Array.from(
      { length: e.dataTransfer.files.length },
      () => '',
    );
    setLocations(prevLocations => [...prevLocations, ...newLocations]);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await processFiles({
      filesState: files,
      processedFiles: e.target.files ? e.target.files : [],
      setStateActionFiles: setFiles,
      setStateActionUploadErrors: setUploadErrors,
      setStateActionIncorrectSize: setIncorrectSizeFiles,
      setStateActionIncorrectTypes: setIncorrectTypeFiles,
      descriptionRef: descriptionRef,
      tags: tags,
    });
    const newLocations = Array.from(
      { length: e.target.files?.length || 0 },
      () => '',
    );
    setLocations(prevLocations => [...prevLocations, ...newLocations]);
  };

  const openFileExplorer = () => {
    inputRef.current.value = '';
    inputRef.current.click();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Get the current user
      const user = auth.currentUser;

      if (!user) {
        flashMessage({ error: { warning: 'User not logged in!' } });
        return;
      }

      const userUuid = user.uid;
      if (files.length === 0) {
        flashMessage({ noFiles: { warning: 'No files to upload' } });
        return;
      }

      // Construct the image data
      const imageData = files.map(file => ({
        image: file.base64String,
        format: file.format || 'some-format',
        location: locations[0] || 'some-location',
        description: descriptionRef.current?.value || 'add description',
        uuid: file.id || 'some-uuid',
        tags: tags,
      }));

      // Define the request body
      const requestBody = {
        userUuid: userUuid,
        images: imageData,
      };

      console.log('Starting fetch operation...');
      const response = await fetch('http://localhost:8000/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Fetch operation completed. Parsing response...');
      const responseData = await response.json();
      console.log('Parsed response data:', responseData);

      if (response.ok) {
        console.log('Response is OK. Processing...');
        console.log('responseData:', responseData);
        console.log('Files state updated.');
        flashMessage({
          uploaded: { success: 'You have successfully uploaded photos' },
        });
        console.log('Success message displayed.');
        closeModal();
        console.log('Modal closed.');
      } else {
        console.log('Response is not OK. Handling error...');
        flashMessage({ uploadError: { error: responseData.message } });
      }
    } catch (err) {
      console.error('Caught an exception:', err);
      flashMessage({
        uploadError: { error: 'An error occurred while uploading the image' },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Box
      component="form"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: '1rem', md: '1.5rem' },
        width: '100%',
        maxWidth: mainContentMaxWidth,
        minWidth: '100%',
        margin: 'auto',
        backgroundColor: dragActive
          ? colors.bgTranslucent
          : colors.backgroundPrimary,
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Upload photo
        </Typography>
        <Confirm
          dialogButton={<CloseIcon />}
          dialogTitle="Cancel Upload"
          dialogText="Closing the uploader will cancel all uploads. Are you sure you want to close?"
          confirmDialogText="Cancel upload"
          cancelDialogText="Keep uploading"
          cancelAction={() => cancelAction()}
          openConfirm={openConfirm}
          openConfirmAction={openConfirmAction}
        />
      </Box>
      <Input
        inputRef={inputRef}
        type="file"
        placeholder="fileInput"
        onChange={handleChange}
        inputProps={{
          multiple: true,
          accept: ACCEPTED_FILES.join().replace(/^|,\s*/g, '$&image/'),
        }}
        sx={{
          display: 'none',
        }}
      />
      <UploadCta files={files} onClick={openFileExplorer} />
      {findErrorType(uploadErrors, 'size') && (
        <UploadError
          errorType="size"
          incorrectFiles={incorrectSizeFiles}
          errors={uploadErrors}
          setUploadErrors={setUploadErrors}
          setIncorrectFiles={setIncorrectSizeFiles}
        />
      )}
      {findErrorType(uploadErrors, 'type') && (
        <UploadError
          errorType="type"
          incorrectFiles={incorrectTypeFiles}
          errors={uploadErrors}
          setUploadErrors={setUploadErrors}
          setIncorrectFiles={setIncorrectTypeFiles}
        />
      )}
      {files.length > 0 && (
        <>
          <UploadImagePreview
            files={files}
            setFiles={setFiles}
            locations={locations}
            setLocations={setLocations}
          />
          <UploadTextField descriptionRef={descriptionRef} />
          <UploadTagsField tags={tags} tagsSetAction={setTags} />
        </>
      )}

      {showMessages && <MessageBanners messages={messages} />}
      <Stack
        sx={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: { xs: 'center', md: 'flex-end' },
          gap: '1rem',
        }}
      >
        {useMediaQuery(theme.breakpoints.up('md')) && (
          <Confirm
            openConfirm={openConfirm}
            openConfirmAction={openConfirmAction}
            dialogButton={
              <Button variant="outlined" sx={btnOutlinedStyle}>
                Cancel
              </Button>
            }
            dialogTitle="Cancel Upload"
            dialogText="Closing the uploader will cancel all uploads. Are you sure you want to close?"
            confirmDialogText="Cancel upload"
            cancelDialogText="Keep uploading"
            cancelAction={() => cancelAction()}
          />
        )}
        <Button
          variant="contained"
          type="submit"
          disabled={files.length <= 0}
          sx={{
            ...btnPrimaryStyle,
            width: {
              xs: '100%',
              md: 'auto',
            },
            maxWidth: {
              xs: '400px',
              md: 'auto',
            },
          }}
        >
          Upload
        </Button>
      </Stack>
    </Box>
  );
};

export default Upload;
