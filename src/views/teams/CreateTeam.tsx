// hooks e bibliotecas
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

// componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import SearchableSelect from "@/components/shared/SearchableSelect";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";

// API, schemas, hooks e assets
import { teamSchema, TeamFormData } from "@/schemas/teamSchema";
import { createTeam, getTeamFormData, TeamDTO } from "@/api/teamRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import IconSad from "@/assets/images/famicons_sad.png";

const CreateTeam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.previousRoute;

  // Busca os dados necessários para os selects do formulário
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["teamFormData"],
    queryFn: getTeamFormData,
  });

  // Hook de mutação para lidar com a criação do recurso
  const {
    mutate,
    isPending,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal,
  } = useResourceMutation<TeamDTO>({
    mutationFn: ({ payload }) => createTeam(payload),
    successToastMessage: "Equipe cadastrada com sucesso!",
    successNavigationRoute: previousRoute || "/configuracoes/equipes", // Rota de fallback
    errorModalMessage: "Não foi possível cadastrar a equipe.",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      sectorId: undefined,
      responsibleId: undefined,
      isInternal: true,
    },
    mode: "onChange",
  });

  // Função chamada ao submeter o formulário válido
  const onSubmit = (data: TeamFormData) => {
    const payload: TeamDTO = {
      nome_equipe: data.teamName,
      id_setor: data.sectorId,
      responsavel_equipe: data.responsibleId,
      equipe_interna: data.isInternal,
    };
    mutate({ payload });
  };

  // Prepara as opções para os selects
  const sectorOptions =
    formData?.setores?.map((setor) => ({
      value: setor.id_setor,
      label: setor.nome_setor,
    })) || [];
  const responsibleOptions =
    formData?.pessoas?.map((pessoa) => ({
      value: pessoa.id_pessoa,
      label: pessoa.first_name + (pessoa.last_name ? ` ${pessoa.last_name}` : ""),
    })) || [];

  return (
    <>
      <Modal
        title="Erro!"
        description={errorModalMessage}
        onClick1={closeErrorModal}
        isModalVisible={isErrorModalVisible}
        buttonTitle1="FECHAR"
        isError={true}
        iconImage={IconSad}
      />
      <BaseScreen>
        <BackButton
          onClick={() => navigate(previousRoute || "/configuracoes/equipes")}
        />
        <PageTitle
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title="Cadastrar Equipe"
        />
        <Motion>
          <Box
            title="Nova Equipe"
            subtitle="Preencha os dados do formulário e cadastre uma nova equipe."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Dados da Equipe" />
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-end">
                  <Controller
                    name="teamName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="NOME DA EQUIPE"
                        width="w-2/3" // Largura ajustada
                        height="h-[40px]"
                        isMandatory
                        placeholder="Digite o nome da equipe..."
                        errorMessage={errors.teamName?.message}
                        borderColor={
                          errors.teamName
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <div className="w-1/3 mb-1">
                    {" "}
                    {/* Div para alinhar o toggle */}
                    <Controller
                      name="isInternal"
                      control={control}
                      render={({ field }) => (
                        <ToggleSwitch
                          title="EQUIPE INTERNA?"
                          isMandatory={false}
                          isChecked={field.value ?? false}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Controller
                    name="sectorId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="SETOR"
                        isMandatory
                        options={sectorOptions}
                        value={
                          sectorOptions.find((c) => c.value === field.value) ||
                          null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Selecione um setor"
                        }
                        errorMessage={errors.sectorId?.message}
                        width="w-1/2"
                      />
                    )}
                  />
                  <Controller
                    name="responsibleId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="RESPONSÁVEL PELA EQUIPE"
                        isMandatory
                        options={responsibleOptions}
                        value={
                          responsibleOptions.find(
                            (c) => c.value === field.value
                          ) || null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Selecione um responsável"
                        }
                        errorMessage={errors.responsibleId?.message}
                        width="w-1/2"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full mt-10 justify-center">
                <ColoredButton
                  type="submit"
                  title={isPending ? "CADASTRANDO..." : "CADASTRAR EQUIPE"}
                  width="w-[40%]"
                  icon="fa-solid fa-floppy-disk"
                  color="customYellow"
                  justify="justify-center"
                />
              </div>
            </form>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateTeam;
