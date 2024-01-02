'use client';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import axios from 'axios';

interface LocationsProps {
  index: number;
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

const Locations: React.FC<LocationsProps> = ({
  index,
  locations,
  setLocations,
}) => {
  const handleLocationSelect = (selectedLocation: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = selectedLocation;
    setLocations(updatedLocations);
  };

  const [locationOptions, setLocationOptions] = useState<Location[]>([]);

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const fieldStyles = isFocused
    ? {
        height: '40px',
        borderRadius: '10px',
        backgroundColor: 'white',
        paddingTop: '1px',
        width: '250px',
        paddingRight: '10px',
      }
    : {
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#637381',
        paddingTop: '1px',
        color: 'white',
        width: '200px',
        paddingRight: '10px',
      };

  const fetchLocations = async (inputValue: string): Promise<string[]> => {
    try {
      const response = await axios.get(
        `http://localhost:8000/locations?input=${inputValue}`,
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      return [];
    }
  };

  const fetchData = async () => {
    if (inputValue.length === 0) {
      setLocationOptions([]);
      return;
    }
    if (inputValue.length >= 3) {
      try {
        const locations = await fetchLocations(inputValue);
        setLocationOptions(locations);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    }
  };

  const debouncedFetchData = debounce(fetchData, 250);

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, [inputValue]);

  return (
    <Autocomplete
      value={selectedLocation}
      options={locationOptions}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={option => option || ''}
      onChange={(event, newValue) => {
        setSelectedLocation(newValue);
        if (newValue) {
          handleLocationSelect(newValue);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      sx={{
        '& .MuiFormControl-root': {
          '& .MuiInputBase-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        },
      }}
      componentsProps={{
        popper: { style: { minWidth: '250px', width: 'fit-content' } },
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      ListboxProps={{
        style: {
          overflowY: 'hidden',
          maxHeight: '200px',
          overflowX: 'visible',
        },
      }}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Add Location"
          fullWidth
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            ...params.InputProps,
            endAdornment: null,
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src={
                    isFocused ? '/ic_location black.svg' : '/ic_location.svg'
                  }
                  alt="Mui Pin"
                  width={24}
                  height={24}
                />
              </InputAdornment>
            ),
            style: fieldStyles,
          }}
        />
      )}
    />
  );
};

export default Locations;
