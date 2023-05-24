import { useEffect } from "react";
import ReactPlayer from "react-player";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useData } from "../context/VideosContext";
import VideoCardSide from "./VideoCardSide";
import { BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineScissor } from "react-icons/ai";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const { state, handleScrollEvent, setState } = useData();
  const { selectedVideo, videos } = state;

  const isSmallerThan400 = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  useEffect(() => {
    const video = videos.find((video) => video.postId === id);
    if (video) {
      setState((prevState) => ({ ...prevState, selectedVideo: video }));
    }
  }, [id, videos, setState]);

  const filteredVideos = videos.filter((video) => video.postId !== id);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <>
      {isSmallerThan400 ? (
        <>
          <Flex flexDirection="column">
            <ReactPlayer
              width="100%"
              height="30rem"
              // playing={true}
              controls={true}
              url={selectedVideo.submission?.mediaUrl}
            />
            <Flex
              gap="2rem"
              mt="1rem"
              ml="3rem"
              mr="3rem"
              flexDirection="column"
            >
              <Flex gap="0.5rem" flexDirection="column" w="100%">
                <Heading fontFamily="Roboto" fontWeight="500" fontSize="1.5rem">
                  {selectedVideo.submission?.title}
                </Heading>
                <Flex flexDirection="column" gap="2rem">
                  <Flex gap="1rem">
                    <Avatar
                      name={selectedVideo.creator?.name}
                      src={selectedVideo.creator?.pic}
                    />
                    <Text
                      fontFamily="Roboto"
                      fontWeight="500"
                      fontSize="1.2rem"
                    >
                      {selectedVideo.creator?.handle}
                    </Text>
                    <Button
                      _hover={{ bg: "#AAAAAA" }}
                      textColor="#000"
                      bg="#FFF"
                      borderRadius="2rem"
                      fontSize="1rem"
                    >
                      Subscribe
                    </Button>
                  </Flex>
                  <Flex gap="1rem" justifySelf="felx-end">
                    <Button gap="0.5rem" borderRadius="2rem">
                      <BiLike />
                      Like
                    </Button>
                    <Button gap="0.5rem" borderRadius="2rem">
                      <RiShareForwardLine />
                      Share
                    </Button>
                    <Button gap="0.5rem" borderRadius="2rem">
                      <AiOutlineScissor />
                      Clip
                    </Button>
                    <Button p="0" borderRadius="50%" marginLeft="auto">
                      <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                        style={{
                          height: "1.7rem",
                          width: "1.7em",
                          fill: "white",
                        }}
                      >
                        <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                      </svg>
                    </Button>
                  </Flex>
                </Flex>
                <Flex
                  p="0.5rem"
                  borderRadius="1rem"
                  bg="#272727"
                  flexDirection="column"
                >
                  <Text fontFamily="Roboto" fontWeight="300" fontSize="1rem">
                    Description
                  </Text>
                  <Text fontFamily="Roboto" fontWeight="300" fontSize="1rem">
                    {selectedVideo.submission?.description}
                  </Text>
                </Flex>
                <Divider mt="1rem" mb="1rem" />
                <Text fontFamily="Roboto" fontWeight="300" fontSize="1rem">
                  Comments
                </Text>
                <Flex gap="1rem">
                  <Avatar
                    size="md"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Input
                    focusBorderColor="#AAAAAA"
                    borderRadius="0"
                    border="none"
                    borderBottom="1px"
                    borderColor="#AAAAAA"
                    textColor="#AAAAAA"
                    textStyle="Roboto"
                    placeholder="Add a comment..."
                  />
                </Flex>
              </Flex>
              <Flex gap="2rem" ml="2rem" w="100%" flexDirection="column">
                {filteredVideos?.map((video, index) => {
                  return <VideoCardSide key={index} video={video} />;
                })}
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex flexDirection="column">
            <ReactPlayer
              width="100%"
              height="30rem"
              playing={true}
              controls={true}
              url={selectedVideo.submission?.mediaUrl}
            />
            <Flex mt="1rem" ml="3rem" mr="3rem" flexDirection="row">
              <Flex gap="0.5rem" flexDirection="column" w="70%">
                <Heading fontFamily="Roboto" fontWeight="500" fontSize="1.5rem">
                  {selectedVideo.submission?.title}
                </Heading>
                <Flex gap="2rem">
                  <Avatar
                    name={selectedVideo.creator?.name}
                    src={selectedVideo.creator?.pic}
                  />
                  <Text fontFamily="Roboto" fontWeight="500" fontSize="1.2rem">
                    {selectedVideo.creator?.handle}
                  </Text>
                  <Button
                    _hover={{ bg: "#AAAAAA" }}
                    textColor="#000"
                    bg="#FFF"
                    borderRadius="2rem"
                    fontSize="1rem"
                  >
                    Subscribe
                  </Button>
                  <Flex gap="1rem" justifySelf="felx-end" marginLeft="auto">
                    <Button gap="0.5rem" borderRadius="2rem">
                      <BiLike />
                      Like
                    </Button>
                    <Button gap="0.5rem" borderRadius="2rem">
                      <RiShareForwardLine />
                      Share
                    </Button>
                    <Button gap="0.5rem" borderRadius="2rem">
                      <AiOutlineScissor />
                      Clip
                    </Button>
                    <Button p="0" borderRadius="50%" marginLeft="auto">
                      <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                        style={{
                          height: "1.7rem",
                          width: "1.7em",
                          fill: "white",
                        }}
                      >
                        <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                      </svg>
                    </Button>
                  </Flex>
                </Flex>
                <Flex
                  p="0.5rem"
                  borderRadius="1rem"
                  bg="#272727"
                  flexDirection="column"
                >
                  <Text fontFamily="Roboto" fontWeight="300" fontSize="1rem">
                    Description
                  </Text>
                  <Text fontFamily="Roboto" fontWeight="300" fontSize="1rem">
                    {selectedVideo.submission?.description}
                  </Text>
                </Flex>
                <Divider mt="1rem" mb="1rem" />
                <Text fontFamily="Roboto" fontWeight="300" fontSize="1rem">
                  Comments
                </Text>
                <Flex gap="1rem">
                  <Avatar
                    size="md"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Input
                    focusBorderColor="#AAAAAA"
                    borderRadius="0"
                    border="none"
                    borderBottom="1px"
                    borderColor="#AAAAAA"
                    textColor="#AAAAAA"
                    textStyle="Roboto"
                    placeholder="Add a comment..."
                  />
                </Flex>
              </Flex>
              <Flex gap="2rem" ml="2rem" w="30%" flexDirection="column">
                {filteredVideos?.map((video, index) => {
                  return <VideoCardSide key={index} video={video} />;
                })}
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};
export default VideoPlayer;
