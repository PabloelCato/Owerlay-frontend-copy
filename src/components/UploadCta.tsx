import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { colors, maxUploadFiles } from '@/constants';
import Image from 'next/image';

const UploadCta = ({
  files,
  onClick,
}: {
  files: UploadFile[];
  onClick: () => void;
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(0);
  useEffect(() => {
    setUploadedFiles(files.length);
  }, [files]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: uploadedFiles > 0 ? '400px' : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bgTranslucent,
        border: '1px dashed ' + colors.inputBorder,
        borderRadius: '8px',
        flex: 1,
      }}
    >
      <Box
        sx={{
          height:
            uploadedFiles > 0
              ? { xs: '307px', md: '370px' }
              : {
                  xs: 'auto',
                  md: '370px',
                },
          display: 'flex',
          flexDirection:
            uploadedFiles > 0
              ? 'column'
              : {
                  xs: 'column',
                  md: 'row',
                },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: '1.5rem', md: '2.5rem' },
          p: '1rem',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '130px', md: '217px' },
            height: { xs: '97px', md: '160px' },
          }}
        >
          <Image
            priority
            fill
            src="/illustration_upload.svg"
            alt="upload-picture"
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        {uploadedFiles < maxUploadFiles ? (
          <Stack
            direction="column"
            alignItems={
              uploadedFiles > 0
                ? 'center'
                : {
                    xs: 'center',
                    md: 'flex-start',
                  }
            }
            justifyContent="center"
            gap="0.5rem"
          >
            <Typography
              variant="h4"
              sx={{
                textAlign:
                  uploadedFiles > 0
                    ? 'center'
                    : {
                        xs: 'center',
                        md: 'left',
                      },
                color: colors.textPrimary,
                fontSize: { xs: '18px', md: '24px' },
              }}
            >
              Select up to {maxUploadFiles - files.length} photos
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign:
                  uploadedFiles > 0
                    ? 'center'
                    : {
                        xs: 'center',
                        md: 'left',
                      },
                color: colors.textSecondary,
                fontSize: { xs: '14px', md: '16px' },
              }}
            >
              Drop photos here or click&nbsp;
              <Box
                component="span"
                onClick={onClick}
                sx={{
                  cursor: 'pointer',
                  borderBottom: '1px solid' + colors.buttonPrimary,
                  color: colors.buttonPrimary,
                  '&:hover': {
                    filter: 'brightness(1.2)',
                  },
                }}
              >
                browse
              </Box>
              &nbsp;through your machine
            </Typography>
          </Stack>
        ) : (
          <Stack
            direction="column"
            alignItems={
              uploadedFiles > 0
                ? 'center'
                : {
                    xs: 'center',
                    md: 'flex-start',
                  }
            }
            justifyContent="center"
            gap="0.5rem"
          >
            <Typography
              variant="h4"
              sx={{
                textAlign:
                  uploadedFiles > 0
                    ? 'center'
                    : {
                        xs: 'center',
                        md: 'left',
                      },
                color: colors.textPrimary,
                fontSize: { xs: '18px', md: '24px' },
              }}
            >
              You have selected maximum allowed number of photos (
              {maxUploadFiles})
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default UploadCta;
