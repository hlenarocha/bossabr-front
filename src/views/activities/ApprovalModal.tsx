import { useForm, Controller } from "react-hook-form";
import Modal from "@/components/modal/Modal";
import TextArea from "@/components/shared/TextArea";

interface ApprovalFormData {
  reason: string;
}

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void; // A razão é opcional (só para reprovação)
  action: 'approve' | 'reprove';
  activityTitle: string;
}

const ApprovalModal = ({ isOpen, onClose, onConfirm, action, activityTitle }: ApprovalModalProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<ApprovalFormData>();

  const isReproving = action === 'reprove';

  const modalTexts = {
    approve: {
      title: "Aprovar atividade",
      description: `Você tem certeza que deseja aprovar a atividade "${activityTitle}"? Esta ação não poderá ser desfeita.`,
      confirmButton: "Sim, aprovar",
      icon: "fa-solid fa-check-circle",
    },
    reprove: {
      title: "Reprovar atividade",
      description: `Você está prestes a reprovar a atividade "${activityTitle}". Por favor, descreva os ajustes necessários abaixo.`,
      confirmButton: "Confirmar reprovação",
      icon: "fa-solid fa-times-circle",
    }
  };

  const currentTexts = modalTexts[action];

  const onSubmit = (data: ApprovalFormData) => {
    onConfirm(data.reason);
  };

  return (
    <Modal
      isModalVisible={isOpen}
      title={currentTexts.title}
      description={currentTexts.description}
      iconName={currentTexts.icon}
      iconColor={isReproving ? "text-customRedTask" : "text-customGreenTask"}
      onClick1={onClose}
      buttonTitle1="Cancelar"
      // Se for aprovação, o onConfirm não precisa de dados. Se for reprovação, o formulário chama o onConfirm via handleSubmit.
      onClick2={isReproving ? handleSubmit(onSubmit) : () => onConfirm()}
      buttonTitle2={currentTexts.confirmButton}
      buttonColor2={isReproving ? "bg-customRedTask" : "bg-customGreenTask"}
    >
      {isReproving && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="reason"
            control={control}
            rules={{ required: "O motivo da reprovação é obrigatório." }}
            render={({ field }) => (
              <TextArea
                {...field}
                title="MOTIVO DA REPROVAÇÃO / AJUSTES NECESSÁRIOS"
                isMandatory
                placeholder="Ex: O cliente comunicou que a cor do logo está incorreta, por favor, use o pantone #123XYZ do manual da marca."
                height="h-[150px]"
                borderColor={errors.reason ? "border-customRed" : "border-customYellow"}
                errorMessage={errors.reason?.message}
              />
            )}
          />
        </form>
      )}
    </Modal>
  );
};

export default ApprovalModal;