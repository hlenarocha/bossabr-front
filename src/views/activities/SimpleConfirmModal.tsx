import Modal from "@/components/modal/Modal"; // Reutiliza seu componente base de Modal

interface SimpleConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  iconName?: string;
  iconColor?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

/**
 * Um modal de confirmação simples para ações de "Sim/Não".
 * Ele não contém campos de formulário, apenas texto e botões de ação.
 */
const SimpleConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  iconName = "fa-solid fa-triangle-exclamation",
  iconColor = "text-customYellow",
  confirmButtonText = "Confirmar",
  confirmButtonColor = "bg-customGreenTask",
}: SimpleConfirmModalProps) => {

  return (
    <Modal
      isModalVisible={isOpen}
      title={title}
      description={description}
      iconName={iconName}
      iconColor={iconColor}
      onClick1={onClose}
      buttonTitle1="Cancelar"
      buttonColor1="bg-customYellow"
      onClick2={onConfirm}
      buttonTitle2={confirmButtonText}
      buttonColor2={confirmButtonColor}
      width="w-11/12 max-w-lg" // Um modal menor, focado na confirmação
    >
      {/* Este modal é simples e não precisa de conteúdo interno (children),
        pois toda a informação é passada pelas props 'title' e 'description'.
      */}
    </Modal>
  );
};

export default SimpleConfirmModal;