import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUserAtom } from "../auth/current-user.state";
import { io, Socket } from "socket.io-client"
export interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
  cameraOn: boolean;
  voiceOn: boolean;
}

export const useMeeting = () => {
  const [localStreams, setLocalStreams] = useState<MediaStream[]>([]);
  const currentUser = useAtomValue(currentUserAtom);
  const [me, setMe] = useState<Participant>({
    id: currentUser!.id,
    name:currentUser!.name,
    stream: localStreams[0],
    cameraOn: true,
    voiceOn: true,
  })

  const socketRef = useRef<Socket>(null)

  useEffect(() => {
    setMe((prev) => ({ ...prev, stream: localStreams[0]}))
  }, [localStreams])

  const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStreams((prev) => [...prev, stream])
  };

  const toggleVideo = () => {
    let cameraOn = false;
    const localStream = me.stream;
    if(localStream != null) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      cameraOn = videoTracks[0]?.enabled;
    }
    setMe((prev) => ({ ...prev, cameraOn }))
  }
  const toggleVoice = () => {
    let voiceOn = false;
    const localStream = me.stream;
    if(localStream != null) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      voiceOn = audioTracks[0]?.enabled;
    }
    setMe((prev) => ({ ...prev, voiceOn }))
  };

  const join = async() => {
    const localStream = me.stream;
    if(localStream == null || currentUser == null) return;
    io(import.meta.env.VITE_API_URL);
  }



  return { me , getStream, toggleVideo, toggleVoice }
}