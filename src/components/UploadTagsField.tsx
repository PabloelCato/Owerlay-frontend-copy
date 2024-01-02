'use client';

import React, { SetStateAction, useRef } from 'react';
import { Chip, InputAdornment, TextField } from '@mui/material';
import { colors, uploadTextFieldStyles } from '@/constants';

const UploadTagsField = ({
  tags,
  tagsSetAction,
}: {
  tags: string[];
  tagsSetAction: React.Dispatch<SetStateAction<string[]>>;
}) => {
  const inputRef = useRef<any>(null);

  const filterTag = (tag: string) => {
    const filteredTag = tag
      .replace(/[^\w -]/g, '')
      .trim()
      .replace(/\W+/g, '-');
    return filteredTag.substring(0, 30);
  };

  const addTag = (text: string) => {
    const filteredTag = filterTag(text);
    if (tags.length === 0) {
      tagsSetAction(prevState => [...prevState, filteredTag]);
    } else {
      if (!tags.some(tag => tag.toLowerCase() === filteredTag.toLowerCase())) {
        tagsSetAction(prevState => [...prevState, filteredTag]);
      }
    }
  };

  const deleteTag = (index?: number) => {
    if (index) {
      tagsSetAction(prevState => {
        const newArr = [...prevState];
        newArr.splice(index, 1);
        return newArr;
      });
    } else {
      tagsSetAction(prevState => {
        const newArr = [...prevState];
        newArr.pop();
        return newArr;
      });
    }
  };

  const handleBlur = (_: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current.value) addTag(inputRef.current.value);
    inputRef.current.value = '';
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === '.') {
      e.preventDefault();
      if (inputRef.current.value) addTag(inputRef.current.value);
      inputRef.current.value = '';
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      deleteTag();
    }
  };

  return (
    <>
      <TextField
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        fullWidth
        label="Tag"
        placeholder="+ Tags"
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                height: 'auto',
                maxHeight: '100%',
                width: 'auto',
                gap: '5px',
              }}
            >
              {tags.map((t, idx) => (
                <Chip
                  key={idx}
                  label={t}
                  onDelete={() => deleteTag(idx)}
                  sx={{
                    fontSize: '14px',
                    background: colors.bgTag,
                  }}
                />
              ))}
            </InputAdornment>
          ),
        }}
        sx={{
          ...uploadTextFieldStyles,
          height: 'auto',
          minHeight: 0,
        }}
      />
    </>
  );
};

export default UploadTagsField;
