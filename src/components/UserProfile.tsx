'use client';
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useState,
  useEffect,
} from 'react';
import { AuthContext } from '@/components/OwerlayContextProvider';
import {
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import {
  btnPrimaryStyle,
  colors,
  mainContentMaxWidth,
  routes,
} from '@/constants';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import { auth } from '@/lib/firebase';

interface ProfileData {
  bio: string;
  place: string;
}

const UserProfile: React.FC<{ showDelete?: boolean }> = ({
  showDelete = true,
}) => {
  const { state, dispatch } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) =>
    setSelectedTab(newValue);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [userImages, setUserImages] = useState<GalleryItem[]>([]);

  const currentUserUuid = state?.user?.uid;

  const handleDelete = async uuid => {
    try {
      const response = await fetch(
        `http://localhost:8000/images?uuid=${uuid}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error deleting image');
      }

      console.log('Image deleted successfully');

      setImages(currentImages =>
        currentImages.filter(image => image.uuid !== uuid),
      );
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserUuid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userUuid) {
      fetch(`http://localhost:8000/images?uuid=${userUuid}`)
        .then(response => response.json())
        .then(data => {
          setUserImages(data);
        })
        .catch(error => {
          console.error('Error fetching user images:', error);
        });
    }
  }, [userUuid]);

  const [profileData, setProfileData] = useState<ProfileData>({
    bio: state.bio || '',
    place: state.place || '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const formatFollowers = (count: number) => {
    if (count < 1000) return count;
    return (count / 1000).toFixed(1) + 'k';
  };
  const dummyFollowers = 1250;

  const formatLikes = (count: number) => {
    if (count < 1000) return count;
    return (count / 1000).toFixed(1) + 'k';
  };

  const dummyLikes = 12000;

  const formatCollections = (count: number) => {
    if (count < 1000) return count;
    return (count / 1000).toFixed(1) + 'k';
  };

  const dummyCollections = 12;

  const formatPhotos = (count: number) => {
    if (count < 1000) return count;
    return (count / 1000).toFixed(1) + 'k';
  };

  const dummyPhotos = 1500;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '0px',
      }}
    >
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: { xs: '100%', md: '85%', lg: '70%' },
            maxWidth: mainContentMaxWidth,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginTop: '-1rem',
            }}
          >
            <Avatar
              src={
                state.loggedIn && state.photoURL
                  ? state.photoURL
                  : 'path_to_default_profile_picture.jpg'
              }
              alt={`${state.displayName}'s profile`}
              sx={{
                width: { xs: '60px', md: '110px' },
                height: { xs: '60px', md: '110px' },
                alignSelf: 'flex-start',
                flexDirection: 'column',
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '2rem',
                }}
              >
                {state.displayName}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                {state.email}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {profileData.bio}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem',
                }}
              >
                <Image
                  src="/ic_location-black.svg"
                  alt="Place Icon"
                  width="24"
                  height="24"
                />
                {profileData.place}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem',
                }}
              >
                <Image
                  src="/ic_user_group.svg"
                  alt="Followers Icon"
                  width="24"
                  height="24"
                />
                {formatFollowers(dummyFollowers)} Followers
              </Typography>
            </Box>
          </Box>

          {!isEditing && (
            <Button
              sx={{
                backgroundColor: 'white',
                color: '#2D76FF',
                height: { xs: '40px', md: '45px' },
                borderRadius: '8px',
                border: '1.5px solid #2D76FF',
                gap: { xs: '10px', md: '10px' },
                width: { xs: '60px', md: '180px' },
                fontSize: { md: '1.2rem' },
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#2D76FF',
                  border: '1.5px solid #2D76FF',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setIsEditing(true)}
              variant="contained"
            >
              {isMobile ? (
                'Edit'
              ) : (
                <>
                  <Image
                    src="/Shape.svg"
                    alt="Edit Icon"
                    width={16}
                    height={16}
                  />
                  Edit profile
                </>
              )}
            </Button>
          )}
        </Box>

        {isEditing && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="bio"
              label="Bio"
              value={profileData.bio}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              name="place"
              label="Place"
              value={profileData.place}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1rem',
                marginRight: '5rem',
              }}
            >
              <Button
                onClick={() => setIsEditing(false)}
                variant="contained"
                sx={btnPrimaryStyle}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={btnPrimaryStyle}>
                Save
              </Button>
            </Box>
          </Box>
        )}
      </>

      {!state.loggedIn && (
        <Typography>
          User not logged in, please{' '}
          <Link href={routes.login} style={{ color: colors.buttonPrimary }}>
            login
          </Link>
          .
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1rem',
          width: { xs: '100%', md: '85%', lg: '70%' },
          maxWidth: mainContentMaxWidth,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{
            marginTop: '2rem',
          }}
        >
          <Tab
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: selectedTab === 0 ? 'bold' : 'normal',
                  color: selectedTab === 0 ? 'black' : 'inherit',
                  textTransform: 'none',
                }}
              >
                <Image
                  src="/photo-icon.svg"
                  alt="Description of SVG"
                  width={16}
                  height={16}
                />
                Photos {formatPhotos(dummyPhotos)}
              </Box>
            }
          />
          <Tab
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: selectedTab === 1 ? 'bold' : 'normal',
                  color: selectedTab === 1 ? 'black' : 'inherit',
                  textTransform: 'none',
                }}
              >
                <Image
                  src="/Path.svg"
                  alt="Description of SVG"
                  width={16}
                  height={16}
                />
                Likes {formatLikes(dummyLikes)}
              </Box>
            }
          />
          <Tab
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: selectedTab === 2 ? 'bold' : 'normal',
                  color: selectedTab === 2 ? 'black' : 'inherit',
                  textTransform: 'none',
                }}
              >
                <Image
                  src="/collection.svg"
                  alt="Description of SVG"
                  width={16}
                  height={16}
                />
                Collection {formatCollections(dummyCollections)}
              </Box>
            }
          />
        </Tabs>
      </Box>

      {selectedTab === 0 && userUuid && (
        <ImageGallery
          userUuid={userUuid}
          showDelete={showDelete}
          onDelete={handleDelete}
        />
      )}
      {selectedTab === 1 && userUuid && (
        <ImageGallery
          userUuid={userUuid}
          showDelete={showDelete}
          onDelete={handleDelete}
        />
      )}
      {selectedTab === 2 && userUuid && (
        <ImageGallery
          userUuid={userUuid}
          showDelete={showDelete}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};
export default UserProfile;
