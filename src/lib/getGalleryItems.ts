// This function is used to fetch the gallery items from the API

export const getGalleryItems = async () => {
  const response = await fetch(
    'https://64cbd7c12eafdcdc851963d9.mockapi.io/gallery-items',
    {
      cache: 'no-store',
    },
  );

  // Throw an error if the response is not ok
  // Next.js will catch this error and display the error page
  // so no need to handle it here
  if (!response.ok)
    throw new Error(`${response.statusText} ${response.status}`);

  return await response.json();
};
