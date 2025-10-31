import { useForm, Controller } from "react-hook-form";
import Modal from "@/components/modal/Modal";
import TextArea from "@/components/shared/TextArea";
import SearchableSelect from "@/components/shared/SearchableSelect";
import { useQuery } from "@tanstack/react-query";
import { getPeopleListForApproval } from "@/api/approvalRoutes";
import { useMemo } from "react";

// Interface para os dados do formulário
interface ApprovalFormData {
  reason: string;
  responsibleId: number | null; 
}

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ApprovalFormData) => void;
  action: 'approve' | 'reprove';
  activityTitle: string;
  currentResponsibleId: number; // ID do responsável atual
}

const ApprovalModal = ({ 
  isOpen, onClose, onConfirm, action, currentResponsibleId 
}: ApprovalModalProps) => {

  // Busca os dados das pessoas (conforme sua solicitação de reuso)
  const { data: people, isLoading: isLoadingPeople } = useQuery({
    queryKey: ['peopleForSelect'],
    queryFn: getPeopleListForApproval,
    staleTime: 1000 * 60 * 10,
  });

  const { control, handleSubmit, formState: { errors } } = useForm<ApprovalFormData>({
    defaultValues: {
      reason: '',
      responsibleId: currentResponsibleId // Define o valor padrão do select
    }
  });

  const isReproving = action === 'reprove';

  const peopleOptions = useMemo(() => {
    return people?.map((p: any) => ({ // 'any' aqui por vir de uma rota genérica
      value: p.id_pessoa,
      label: `${p.first_name} ${p.last_name || ''} (${p.cargo})`
    })) || [];
  }, [people]);
  
  const modalTexts = {
    approve: {
      title: "Aprovar atividade",
      description: "Atribua o novo responsável por dar sequência à demanda antes de aprovar essa atividade!",
      confirmButton: "Aprovar atividade",
      icon: "fa-solid fa-check-circle",
    },
    reprove: {
      title: "Reprovar atividade",
      description: "Por favor, descreva os ajustes necessários para o colaborador.",
      confirmButton: "Reprovar atividade",
      icon: "fa-solid fa-times-circle",
    }
  };
  const currentTexts = modalTexts[action];

  return (
    <Modal
      isModalVisible={isOpen}
      title={currentTexts.title}
      description={currentTexts.description}
      iconName={currentTexts.icon}
      iconColor={isReproving ? "text-customRedAlert" : "text-customGreenTask"}
      onClick1={onClose}
      buttonTitle1="Cancelar"
      onClick2={handleSubmit(onConfirm)}
      buttonTitle2={currentTexts.confirmButton}
      buttonColor2={isReproving ? "bg-customRedAlert" : "bg-customGreenTask"}
      width={isReproving ? "w-11/12 max-w-xl" : "w-full max-w-3xl"}
      height={isReproving ? undefined : "h-[700px] max-h-[90vh]"} // aumenta a altura do modal para aprovar
    >
      <form onSubmit={handleSubmit(onConfirm)} className="flex flex-col gap-4">
        {isReproving ? (
          // --- MODO REPROVAR ---
          <Controller
            name="reason"
            control={control}
            rules={{ required: "O motivo da reprovação é obrigatório." }}
            render={({ field }) => (
              <TextArea
                {...field}
                title="MOTIVO DA REPROVAÇÃO / AJUSTES NECESSÁRIOS"
                isMandatory
                placeholder="Ex: A cor do logo está incorreta..."
                height="h-[150px]"
                borderColor={errors.reason ? "border-customRed" : "border-customYellow"}
                errorMessage={errors.reason?.message}
              />
            )}
          />
        ) : (
          // --- MODO APROVAR ---
          <Controller
            name="responsibleId"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                title="NOVO RESPONSÁVEL PELA DEMANDA"
                isMandatory={false}
                options={peopleOptions}
                value={peopleOptions.find(p => p.value === field.value) || null}
                onChange={(option) => field.onChange(option?.value)}
                placeholder={isLoadingPeople ? "Carregando..." : "Manter responsável atual"}
                errorMessage={errors.responsibleId?.message}
              />
            )}
          />
        )}
      </form>
    </Modal>
  );
};

export default ApprovalModal;