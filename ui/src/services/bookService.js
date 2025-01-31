const baseUrl = process.env.REACT_APP_BASE_URL;


export const fetchBooks = async (searchParams) => {
  console.log("fetchBooks searchParams", searchParams);
  try {
    const queryParams = new URLSearchParams(searchParams).toString();
    const urlWithParams = `${baseUrl}/api/v1.0/books/?${queryParams}`; // Append search parameters to the base URL

    const response = await fetch(urlWithParams);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchGenre = async () => {
  try {
    const url = `${baseUrl}/api/v1.0/books/genre`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.log("Error fetching genre:", error);
    // throw error;
    // toast.error('Error fetching genre');
    return error;
  }
};