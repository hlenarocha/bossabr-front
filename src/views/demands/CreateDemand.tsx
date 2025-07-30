// hooks e bibliotecas
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

// componentes
import BaseScreen from "../BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import InputDate from "@/components/shared/InputDate";
import TextArea from "@/components/shared/TextArea";
import InputQuantity from "@/components/shared/InputQuantity";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import SearchableSelect from "@/components/shared/SearchableSelect";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";

// API, schemas, hooks e assets
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { createDemand, getDemandFormData, DemandDTO } from "@/api/demandRoutes";
import { DemandFormData, demandSchema } from "@/schemas/demandSchema";
import IconSad from "@/assets/images/famicons_sad.png";
import PageTitle from "@/components/title/PageTitle";

const CreateDemand = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.previousRoute || "/demandas";

  // Busca os dados para os selects (clientes, serviços, etc.)
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["demandFormData"],
    queryFn: getDemandFormData,
  });

  // Hook para lidar com a criação da demanda
  const {
    mutate,
    isPending,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal,
  } = useResourceMutation<DemandDTO>({
    mutationFn: ({ payload }) => createDemand(payload),
    successToastMessage: "Demanda cadastrada com sucesso!",
    successNavigationRoute: previousRoute,
    errorModalMessage: "Não foi possível cadastrar a demanda.",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
    defaultValues: {
      clientId: undefined,
      serviceId: undefined,
      personId: undefined,
      statusId: undefined,
      description: "",
      quantity: 1,
      driveLink: "",
      deadline: "",
    },
    mode: "onBlur",
  });

  // Mapeia os dados do formulário para o formato da API e envia
  const onSubmit = (data: DemandFormData) => {
    const payload: DemandDTO = {
      id_cliente: data.clientId,
      id_tipo_servico: data.serviceId,
      prazo: data.deadline,
      id_pessoa: data.personId,
      id_status: data.statusId,
      descricao: data.description,
      link_drive: data.driveLink,
      quantidade: data.quantity,
    };
    mutate({ payload });
  };

  // Prepara as opções para os selects a partir dos dados da API
  const clientOptions =
    formData?.clientes?.map((c) => ({
      value: c.id_cliente,
      label: c.nome_empresa,
    })) || [];
  const serviceOptions =
    formData?.tiposServicos?.map((s) => ({
      value: s.id_tipo_servico,
      label: s.nome_servico,
    })) || [];
  const personOptions =
    formData?.pessoas?.map((p) => ({
      value: p.id_pessoa,
      label: p.first_name,
    })) || [];
  const statusOptions =
    formData?.status?.map((s) => ({ value: s.id_status, label: s.status })) ||
    [];

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
          title="Cadastrar Demanda"
        />
        <Motion>
          <Box
            title="Nova Demanda"
            subtitle="Preencha os dados do formulário e cadastre uma nova demanda."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Cliente" />
              <div className="w-2/3">
                <Controller
                  name="clientId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      title="CLIENTE"
                      isMandatory
                      options={clientOptions}
                      value={
                        clientOptions.find((c) => c.value === field.value) ||
                        null
                      }
                      onChange={(option) => field.onChange(option?.value)}
                      placeholder={
                        isLoadingFormData
                          ? "Carregando..."
                          : "Digite para pesquisar um cliente..."
                      }
                      errorMessage={errors.clientId?.message}
                    />
                  )}
                />
              </div>

              <InputTitle title="Serviço" />
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 flex-row w-full">
                  <Controller
                    name="serviceId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="TIPO DE SERVIÇO"
                        isMandatory
                        options={serviceOptions}
                        value={
                          serviceOptions.find((s) => s.value === field.value) ||
                          null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Selecione o serviço..."
                        }
                        errorMessage={errors.serviceId?.message}
                        width="w-1/3"
                      />
                    )}
                  />
                  <Controller
                    name="deadline"
                    control={control}
                    render={({ field }) => (
                      <InputDate
                        title="PRAZO"
                        isMandatory
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.deadline?.message}
                        borderColor={errors.deadline ? "#EF4444" : "#F6BC0A"}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      title="DESCRIÇÃO DO SERVIÇO"
                      placeholder="Digite detalhes sobre o serviço..."
                      isMandatory={false}
                      errorMessage={errors.description?.message}
                      height="h-[100px]"
                      borderColor={
                        errors.description
                          ? "border-customRedAlert"
                          : "border-customYellow"
                      }
                    />
                  )}
                />
                <div className="flex flex-row gap-4">
                  <Controller
                    name="driveLink"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="LINK DO DRIVE"
                        isMandatory={false}
                        placeholder="Insira o link para o Drive do serviço..."
                        width="w-2/3"
                        errorMessage={errors.driveLink?.message}
                        borderColor={
                          errors.driveLink
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                        height="h-[40px]"
                      />
                    )}
                  />
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <InputQuantity
                        title="QUANTIDADE"
                        isMandatory
                        value={field.value}
                        onChange={field.onChange}
                        borderColor={
                          errors.quantity
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                        errorMessage={errors.quantity?.message}
                        min={1}
                        width="w-1/3"
                        height="h-[40px]"
                      />
                    )}
                  />
                </div>
              </div>

              <InputTitle title="Atribuição" />
              <div className="w-2/3">
                <Controller
                  name="personId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      title="RESPONSÁVEL PELA DEMANDA"
                      isMandatory
                      options={personOptions}
                      value={
                        personOptions.find((p) => p.value === field.value) ||
                        null
                      }
                      onChange={(option) => field.onChange(option?.value)}
                      placeholder={
                        isLoadingFormData
                          ? "Carregando..."
                          : "Selecione o responsável..."
                      }
                      errorMessage={errors.personId?.message}
                    />
                  )}
                />
              </div>

              <InputTitle title="Status" />
              <div className="w-2/3">
                <Controller
                  name="statusId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      title="STATUS"
                      isMandatory
                      options={statusOptions}
                      value={
                        statusOptions.find((s) => s.value === field.value) ||
                        null
                      }
                      onChange={(option) => field.onChange(option?.value)}
                      placeholder={
                        isLoadingFormData
                          ? "Carregando..."
                          : "Selecione um status..."
                      }
                      errorMessage={errors.statusId?.message}
                    />
                  )}
                />
              </div>

              <div className="flex w-full mt-10 justify-center">
                <ColoredButton
                  type="submit"
                  width="w-[40%]"
                  title={isPending ? "CADASTRANDO..." : "CADASTRAR DEMANDA"}
                  icon={"fa-solid fa-floppy-disk"}
                  color="customYellow"
                  justify="justify-center"
                />
              </div>
            </form>
          </Box>
        </Motion>
        <ScrollToEndArrow />
      </BaseScreen>
    </>
  );
};

export default CreateDemand;
