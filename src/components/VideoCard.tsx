import { Avatar, Flex, Image, Heading, Text, Button } from "@chakra-ui/react";
import { VideoInterface } from "../interface/VideoInterface";
import { useData } from "../context/VideosContext";
import { Link } from "react-router-dom";

type props = {
  video: VideoInterface;
};

const VideoCard = (props: props) => {
  const { setState } = useData();
  const { video } = props;

  return (
    <>
      <Link to={`/video/${video.postId}`}>
        <Flex
          onClick={() =>
            setState((prevState) => ({ ...prevState, selectedVideo: video }))
          }
          gap="1rem"
          flexDirection="column"
          w="24rem"
          h="19rem"
        >
          <Flex w="23.8rem" h="13rem">
            <Image
              borderRadius="1rem"
              objectFit="contain"
              src={video.submission.thumbnail}
            />
          </Flex>
          <Flex ml="0.7rem" gap="1rem" justifyItems="start" flexDirection="row">
            <Avatar name={video.creator.name} src={video.creator.pic} />
            <Flex flexDirection="column">
              <Heading fontFamily="Roboto" fontWeight="500" fontSize="1.5rem">
                {video.submission.title}
              </Heading>
              <Text
                fontFamily="Roboto"
                fontWeight="300"
                fontSize="0.9rem"
                textColor="#AAAAAA"
              >
                {video.creator.handle}
              </Text>
              <Text
                fontFamily="Roboto"
                fontWeight="300"
                fontSize="0.9rem"
                textColor="#AAAAAA"
              >
                {video.reaction.count} views
              </Text>
            </Flex>
            <Button
              marginLeft="auto"
              p="0"
              bg=""
              borderRadius="50%"
              justifySelf="end"
            >
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
      </Link>
    </>
  );
};

export default VideoCard;
