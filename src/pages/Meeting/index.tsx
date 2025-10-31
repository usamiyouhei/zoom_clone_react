import { FiMessageCircle, FiPhone, FiCopy } from 'react-icons/fi';
import './Meeting.css';
import { VideoTile } from './VideoTile';
import { MediaControls } from './MediaControls';
import { useParams } from 'react-router-dom';
import { meetingRepository } from '../../modules/meetings/meeting.repository';
import { useEffect, useState } from 'react';
import { PreviewMedia } from './PreviewMedia';
import { useMeeting } from '../../modules/meetings/meeting.hook';

function Meeting() {
  const { id } = useParams()
  const [showPreview, setShowPreview] = useState(true);
  const { me, getStream, toggleVideo, toggleVoice } = useMeeting()

  useEffect(() => {
    initialize()
  }, [])


  const initialize = async () => {
    try {
      await meetingRepository.joinMeeting(id!);
      await getStream()
    } catch (error) {
      console.error(error);
    }
  }

  if(showPreview) {
    return (
      <PreviewMedia
        participant={me}
        onToggleVideo={toggleVideo}
        onToggleVoice={toggleVoice}/>)
  }

  return (
    <div className='meeting-container'>
      <div className='video-area'>
        <div className='video-grid'>
          <VideoTile participant={me}/>
          <VideoTile participant={me}/>
        </div>
      </div>

      <div className='control-bar'>
        <MediaControls
          cameraOn={me.cameraOn}
          voiceOn={me.voiceOn}
          onToggleVideo={toggleVideo}
          onToggleVoice={toggleVoice}
        />

        <button className='control-button'>
          <FiMessageCircle />
        </button>

        <button className='control-button'>
          <FiCopy />
        </button>

        <button className='control-button leave-button'>
          <FiPhone />
        </button>
      </div>
    </div>
  );
}

export default Meeting;
