import ReactPlayer from "react-player";
import { useGlobal } from "../context/Global";
import { getUser } from "../utils/getUser";

export default function Player() {
  const { selectStream } = useGlobal();
  const { username, password } = getUser();

  const formatFile = selectStream?.type === "live" ? "m3u8" : "mp4";

  return (
    <ReactPlayer
      url={`http://s3-server.net/${selectStream?.type}/${username}/${password}/${selectStream!.id}.${formatFile}`}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
      controlsList="nodownload"
    />
  );
}
