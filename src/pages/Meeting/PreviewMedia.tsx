import { VideoTile } from './VideoTile';
import { MediaControls } from './MediaControls';
import type { Participant } from '../../modules/meetings/meeting.hook';

interface PreviewMediaProps {
  participant: Participant;
  onToggleVideo: () => void;
  onToggleVoice: () => void;
}

export function PreviewMedia({ 
  participant,
  onToggleVideo,
  onToggleVoice,
 }: PreviewMediaProps) {

  return (
    <div className='meeting-container'>
      <div className='preview-screen'>
        <div className='preview-header'>
          <h2>会議に参加する準備ができました</h2>
          <p>マイクとカメラの設定を確認してください</p>
        </div>

        <div className='preview-video-container'>
          <VideoTile participant={participant}/>
        </div>

        <MediaControls
        cameraOn={participant.cameraOn}
        voiceOn={participant.voiceOn}
        onToggleVideo={onToggleVideo}
        onToggleVoice={onToggleVoice}

        />

        <div className='preview-actions'>
          <button className='control-button cancel-button'>キャンセル</button>
          <button className='join-meeting-button'>会議に参加</button>
        </div>
      </div>
    </div>
  );
}
