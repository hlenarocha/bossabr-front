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
import InputQuantity from "@/components/shared/InputQuantity";
import SearchableSelect from "@/components/shared/SearchableSelect"; // 1. Trocado de Select para SearchableSelect
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";

// API, schemas e assets
import { ServiceFormData, serviceSchema } from "@/schemas/serviceSchema";
import { createService, getServiceFormData, ServiceDTO } from "@/api/serviceRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import IconSad from "@/assets/images/famicons_sad.png";

const CreateService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.previousRoute;

  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["serviceFormData"],
    queryFn: getServiceFormData,
  });

  const {
    mutate,
    isPending,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal,
  } = useResourceMutation<ServiceDTO>({
    mutationFn: ({ payload }) => createService(payload),
    successToastMessage: "Serviço cadastrado com sucesso!",
    successNavigationRoute: previousRoute,
    errorModalMessage: "Não foi possível cadastrar o serviço. Verifique os dados e tente novamente.",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceName: "",
      sectorId: undefined,
      pontuation: 0,
    },
    mode: "onChange",
  });

  const onSubmit = (data: ServiceFormData) => {
    const payload: ServiceDTO = {
      nome_servico: data.serviceName,
      id_setor: data.sectorId,
      pontuacao: data.pontuation ?? null,
    };

    console.log("Payload: ", payload);

    mutate({ payload });
  };

  const sectorOptions = formData?.setores?.map(setor => ({
    value: setor.id_setor,
    label: setor.nome_setor,
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
        <BackButton onClick={() => navigate(previousRoute)} />
        <PageTitle
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title="Cadastrar Serviço"
        />
        <Motion>
          <Box
            title="Novo Serviço"
            subtitle="Preencha os dados do formulário e cadastre um novo serviço."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Dados do Serviço" />
              <div className="w-full flex flex-col">
                <div className="flex flex-row gap-4">
                  <Controller
                    name="serviceName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="NOME DO SERVIÇO"
                        width="w-1/2"
                        isMandatory={true}
                        placeholder="Digite o nome do serviço..."
                        height="h-[40px]"
                        errorMessage={errors.serviceName?.message}
                        borderColor={errors.serviceName ? "border-customRedAlert" : "border-customYellow"}
                      />
                    )}
                  />
                  <Controller
                    name="sectorId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="SETOR RESPONSÁVEL"
                        isMandatory={true}
                        options={sectorOptions}
                        value={sectorOptions.find(c => c.value === field.value) || null}
                        onChange={option => field.onChange(option ? option.value : undefined)}
                        placeholder={isLoadingFormData ? "Carregando..." : "Selecione um setor"}
                        errorMessage={errors.sectorId?.message}
                        width="w-1/2"
                        isSearchable={false}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="pontuation"
                  control={control}
                  render={({ field }) => (
                    <InputQuantity 
                      title="PONTUAÇÃO"
                      height="h-[40px]"
                      width="w-1/3"
                      
                      isMandatory={false}
                      min={0}
                      max={10}
                      step={0.5} 
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      errorMessage={errors.pontuation?.message}
                      borderColor={errors.pontuation ? "border-customRedAlert" : "border-customYellow" }
                    />
                  )}
                />
              </div>
              <div className="flex w-full mt-10 justify-center">
                <ColoredButton
                  type="submit"
                  title={isPending ? "CADASTRANDO..." : "CADASTRAR SERVIÇO"}
                  width="w-[40%]"
                  icon={"fa-solid fa-floppy-disk"}
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

export default CreateService;
