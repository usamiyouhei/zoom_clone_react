import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUserAtom } from "../auth/current-user.state";
import { io, Socket } from "socket.io-client"
import Peer from "peerjs"
export interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
  cameraOn: boolean;
  voiceOn: boolean;
}

export const useMeeting = (meetingId: string) => {
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
  const peerRef = useRef<Peer>(null)

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

    socketRef.current = io(import.meta.env.VITE_API_URL);
    const socket = socketRef.current;
    socket.on("connect", () => hanndleSocketConnected());
  };

  const hanndleSocketConnected = () => {
    const socket = socketRef.current;
    if (socket == null) return;

    peerRef.current = new Peer(me.id,{
      host: "0.peerjs.com",
      port: 443,
      secure: true,
    });
    const peer = peerRef.current;

    peer.on('open',() => {
      socket.emit('join-meeting',meetingId, {
        id: me.id,
        name: me.name,
        voiceOn: me.voiceOn,
        cameraOn: me.cameraOn,
      })
    })
  };



  return { me , getStream, toggleVideo, toggleVoice, join}
}