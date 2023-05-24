import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { VideoInterface } from "../interface/VideoInterface";

// Define the type for the VideosContextProviderProps
type VideosContextProviderProps = {
  children: React.ReactNode;
};

// Define the initial state for the videos context
const initialValues = {
  page: 0, // Current page number for lazy loading
  videos: [] as VideoInterface[], // Array of videos
  isLoading: false, // Loading state
  search: "", // Search query
  selectedVideo: {} as VideoInterface, // Currently selected video
};

// Function that handles lazy loading when scrolling
export const handleScrollEvent = async function (
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>
): Promise<void> {
  const totalHeight = document.documentElement.scrollHeight;
  const innerHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop;

  try {
    // Check if user has scrolled to the bottom of the page
    if (innerHeight + scrollTop + 1 >= totalHeight) {
      setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
    }
  } catch (err) {
    console.log(err);
  }
};

// Create the VideosContext
export const VideosContext = createContext<{
  state: typeof initialValues;
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  handleScrollEvent: () => Promise<void>;
} | null>(null);

// VideosProvider component
export const VideosProvider = ({ children }: VideosContextProviderProps) => {
  const [state, setState] = useState(initialValues);
  const { page } = state;

  // Function to fetch videos based on the current page
  const getVideos = async function (currentPage: number) {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      // Fetch videos from the API
      const {
        data: {
          data: { posts },
        },
      } = await axios.get(
        `https://internship-service.onrender.com/videos?page=${page}`
      );

      // Update the videos state based on the current page
      if (currentPage === 0) {
        setState((prevState) => ({ ...prevState, videos: [...posts] }));
      } else {
        setState((prevState) => ({
          ...prevState,
          videos: [...prevState.videos, ...posts],
        }));
      }

      setState((prevState) => ({ ...prevState, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch videos when the page changes
  useEffect(() => {
    getVideos(page);
  }, [page]);

  // Provide the state, setState, and handleScrollEvent function through context
  return (
    <VideosContext.Provider
      value={{
        state,
        setState,
        handleScrollEvent: handleScrollEvent.bind(null, setState),
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

// Custom hook to consume the videos context
export const useData = () => {
  const context = useContext(VideosContext);
  if (context === null) {
    throw new Error("useData must be used within a VideosProvider");
  }
  return context;
};

export default VideosContext;
