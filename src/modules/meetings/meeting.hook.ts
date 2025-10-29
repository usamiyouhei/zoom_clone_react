import { useState } from "react";

export const useMeeting = () => {

  const [localStreams, setLocalStreams] = useState<MediaStream[]>([]);

  const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStreams((prev) => [...prev, stream])
  }
}