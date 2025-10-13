import Modal from './Modal'; 
import { useHelp } from '@/contexts/HelpContext';

const HelpModal = () => {
  const { isOpen, content, closeHelp } = useHelp();

  if (!isOpen || !content) {
    return null;
  }

  return (
    <Modal
      isModalVisible={isOpen}
      title={content.title}
      iconName="fa-solid fa-circle-question"
      buttonTitle1="FECHAR"
      onClick1={closeHelp}
      width="w-11/12 max-w-2xl" 
    >
      <div className="flex flex-col gap-4 text-zinc-300">
        {content.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Modal>
  );
};

export default HelpModal;