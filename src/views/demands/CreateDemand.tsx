import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "../BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import { useLocation, useNavigate } from "react-router-dom";
import PlainButton from "@/components/shared/PlainButton";
import InputDate from "@/components/shared/InputDate";
import TextArea from "@/components/shared/TextArea";
import InputQuantity from "@/components/shared/InputQuantity";
import ColoredButton from "@/components/shared/ColoredButton";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { createDemand, DemandDTO } from "@/api/demandRoutes";
import { zodResolver } from "@hookform/resolvers/zod";
import { DemandFormData, demandSchema } from "@/schemas/demandSchema";
import { Controller, useForm } from "react-hook-form";
import IconSad from "@/assets/images/famicons_sad.png";
import Modal from "@/components/modal/Modal";
import SearchableSelect from "@/components/shared/SearchableSelect";

const CreateDemand = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousRoute = location.state?.previousRoute;

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
    errorModalMessage: "Não foi possível cadastrar a demanda. Verifique os dados e tente novamente.",
  });

  const { control, handleSubmit, formState: { errors } } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
    defaultValues: {
      clientId: undefined,
      serviceId: undefined,
      //statusId: undefined,
      sectorId: undefined,
      description: "",
      quantity: 1,
      driveLink: "",
      deadline: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: DemandFormData) => {
    const payload: DemandDTO = {
      id_tipo_servico: data.serviceId,
      id_cliente: data.clientId,
      quantidade: data.quantity || 1,
      prazo: data.deadline || "",
      descricao: data.description,
      link_drive: data.driveLink || undefined,
     // id_status: data.statusId,
    };

    console.log("Payload a ser enviado para a API:", payload);

    mutate({ payload });
  };

  // Dados mockados no formato { value, label } para o SearchableSelect
  const mockClientOptions = [
    { value: 1, label: "Innovatech Soluções Digitais Ltda." },
    { value: 2, label: "AgroForte Produtos Agrícolas" },
    { value: 3, label: "Construtora Horizonte Azul" },
    { value: 4, label: "Varejão Econômico Supermercados" },
    { value: 5, label: "LogiMax Transportes e Logística" },
  ];
  const mockServiceOptions = [
    { value: 1, label: "Criação de Logo" },
    { value: 2, label: "Gestão de Mídias" },
    { value: 3, label: "Desenvolvimento de Website" },
  ];
  const mockSectorOptions = [
    { value: 1, label: "Design" },
    { value: 2, label: "Desenvolvimento" },
    { value: 3, label: "Marketing" },
  ];
  

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
        <PageTitle icon="fa-solid fa-circle-plus" marginTop="mt-4" title="Cadastrar Demanda" />
        <Motion>
          <Box title="Nova Demanda" subtitle="Preencha os dados do formulário e cadastre uma nova demanda." width="w-full" height="h-fit">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Cliente" />
              <div className="flex gap-6 flex-row w-full">
                <Controller
                  name="clientId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      title="CLIENTE"
                      isMandatory
                      options={mockClientOptions}
                      value={mockClientOptions.find(c => c.value === field.value) || null}
                      onChange={option => field.onChange(option ? option.value : undefined)}
                      placeholder="Digite para pesquisar um cliente..."
                      errorMessage={errors.clientId?.message}
                    />
                  )}
                />
                <div className="mt-auto mb-3 w-1/3">
                  <PlainButton title="NOVO CLIENTE" color="bg-customYellow" height="h-10" width="w-full" />
                </div>
              </div>

              <div className="mt-6">
                <InputTitle title="Serviço" />
                <div className="flex gap-6 flex-row w-full">
                  <Controller
                    name="serviceId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="TIPO DE SERVIÇO"
                        isMandatory
                        options={mockServiceOptions}
                        value={mockServiceOptions.find(c => c.value === field.value) || null}
                        onChange={option => field.onChange(option ? option.value : undefined)}
                        placeholder="Selecione o serviço..."
                        errorMessage={errors.serviceId?.message}
                        width="w-1/3"
                      />
                    )}
                  />
                  <div className="flex items-center w-1/3">
                    <PlainButton title="NOVO SERVIÇO" color="bg-customYellow" height="h-10" width="w-full" />
                  </div>
                  <Controller
                    name="deadline"
                    control={control}
                    render={({ field }) => (
                      <InputDate
                        title="PRAZO"
                        isMandatory={false}
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        errorMessage={errors.deadline?.message}
                        borderColor={errors.deadline ? "#EF4444" : "#F6BC0A"} // lógica diferente para input date
                      
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
                      isMandatory={true}
                      errorMessage={errors.description?.message}
                      height="h-[100px]"
                      rounded="rounded-[20px]"
                      borderColor={errors.description ? "border-customRedAlert" : "border-customYellow"}
                    />
                  )}
                />
                <div className="flex flex-row gap-6">
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
                        borderColor={errors.driveLink ? "border-customRedAlert" : "border-customYellow"}
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
                        isMandatory={true}
                        borderColor={errors.quantity ? "border-customRedAlert" : "border-customYellow"}
                        value={field.value ?? 0}
                        onChange={field.onChange}
                        errorMessage={errors.quantity?.message}
                        min={1}
                        width="w-1/3"
                        height="h-[40px]"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-6">
                <InputTitle title="Atribuição" />
                <Controller
                  name="sectorId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      title="SETOR RESPONSÁVEL"
                      isMandatory
                      options={mockSectorOptions}
                      value={mockSectorOptions.find(c => c.value === field.value) || null}
                      onChange={option => field.onChange(option ? option.value : undefined)}
                      placeholder="Selecione o setor..."
                      errorMessage={errors.sectorId?.message}
                      width="w-1/3"
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