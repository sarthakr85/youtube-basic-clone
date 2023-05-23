import { useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useData } from "../context/VideosContext";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const { state, setState, handleScrollEvent } = useData();

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <>
      <Flex mt="3rem" justifyContent="center" flexDirection="column">
        <Flex
          flexDirection="row"
          gap="1rem"
          justifyContent="center"
          flexWrap="wrap"
        >
          {state.videos?.map((video, index) => {
            return <VideoCard key={index} video={video} />;
          })}
        </Flex>
        {state.videos.length === 0 && (
          <Flex justifyContent="center" my="2rem">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#919191"
              size="xl"
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default Home;
