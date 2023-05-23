import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { VideoInterface } from "../interface/VideoInterface";

type VideosContextProviderProps = {
  children: React.ReactNode;
};

// Initial State
const initialValues = {
  page: 0,
  videos: [] as VideoInterface[],
  isLoading: false,
  search: "",
  selectedVideo: {} as VideoInterface,
};

// Function that handles lazy loading
export const handleScrollEvent = async function (
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>
): Promise<void> {
  const totalHeight = document.documentElement.scrollHeight;
  const innerHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop;

  try {
    if (innerHeight + scrollTop + 1 >= totalHeight) {
      setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
    }
  } catch (err) {
    console.log(err);
  }
};

// Context
export const VideosContext = createContext<{
  state: typeof initialValues;
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  handleScrollEvent: () => Promise<void>;
} | null>(null);

export const VideosProvider = ({ children }: VideosContextProviderProps) => {
  const [state, setState] = useState(initialValues);
  const { page } = state;

  // Function to fetch initial State
  const getVideos = async function (currentPage: number) {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const {
        data: {
          data: { posts },
        },
      } = await axios.get(
        `https://internship-service.onrender.com/videos?page=${page}`
      );
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

  useEffect(() => {
    getVideos(page);
  }, [page]);

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

export const useData = () => {
  const context = useContext(VideosContext);
  if (context === null) {
    throw new Error("useData must be used within a VideosProvider");
  }
  return context;
};

export default VideosContext;
