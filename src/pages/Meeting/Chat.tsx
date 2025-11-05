import { FiSend, FiX } from 'react-icons/fi';

interface ChatProps {
  onClose: () => void;
}

export function Chat({ onClose }: ChatProps) {
  return (
    <div className='chat-sidebar'>
      <div className='chat-header'>
        <h3>チャット</h3>
        <button className='close-chat' onClick={onClose}>
          <FiX />
        </button>
      </div>
      <div className='chat-messages'></div>
      <form className='chat-input'>
        <input type='text' placeholder='メッセージを入力...' />
        <button type='button'>
          <FiSend />
        </button>
      </form>
    </div>
  );
}
