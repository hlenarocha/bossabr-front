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
import InputDate from "@/components/shared/InputDate";
import TextArea from "@/components/shared/TextArea";
import SearchableSelect from "@/components/shared/SearchableSelect";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";

// API, schemas, hooks e assets
import { clientSchema, ClientFormData } from "@/schemas/clientSchema"; // Usa o novo schema
import { createClient, getClientFormData, ClientDTO } from "@/api/clientRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import IconSad from "@/assets/images/famicons_sad.png";


// VERIFICAR IS MANDATORY NOS INPUTS E TESTAR


const CreateClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.previousRoute;

  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["clientFormData"],
    queryFn: getClientFormData,
  });

  const {
    mutate,
    isPending,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal,
  } = useResourceMutation<ClientDTO>({
    mutationFn: ({ payload }) => createClient(payload),
    successToastMessage: "Cliente cadastrado com sucesso!",
    successNavigationRoute: previousRoute || "/clientes",
    errorModalMessage: "Não foi possível cadastrar o cliente.",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      enterpriseName: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      isActive: true,
      businessId: undefined,
    },
    mode: "onBlur",
  });

  const onSubmit = (data: ClientFormData) => {
    const payload: ClientDTO = {
      nome_empresa: data.enterpriseName,
      nome_responsavel: data.contactName,
      id_setor_negocio: data.businessId ?? 0,
      email: data.contactEmail ?? "",
      telefone: data.contactPhone ?? "",
      data_entrada: data.entryDate ?? "",
      data_fim_contrato: data.contractEndDate ?? "",
      desc_contrato: data.contractDescription ?? "",
      briefing: data.briefing ?? "",
      ativo: data.isActive ?? false,
      classificacao: data.classification ?? "",
    };

    console.log("Cliente payload: ", payload);

    mutate({ payload });

    
  };

  const businessSectorOptions =
    formData?.setoresNegocio?.map((s) => ({
      value: s.id_setor_negocio,
      label: s.nome_setor_negocio,
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
        <BackButton onClick={() => navigate(previousRoute || "/clientes")} />
        <PageTitle
          icon="fa-solid fa-user-tie"
          marginTop="mt-4"
          title="Cadastrar Cliente"
        />
        <Motion>
          <Box
            title="Novo Cliente"
            subtitle="Preencha os dados do formulário e cadastre um novo cliente."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Dados do Cliente" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-end gap-4">
                  <Controller
                    name="enterpriseName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="NOME DO CLIENTE"
                        width="w-2/3"
                        height="h-[40px]"
                        isMandatory
                        placeholder="Digite o nome do cliente..."
                        errorMessage={errors.enterpriseName?.message}
                        borderColor={errors.enterpriseName ? "border-customRedAlert" : "border-customYellow"}
                      />
                    )}
                  />
                  <div className="w-1/3 mb-1">
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <ToggleSwitch
                          isMandatory={false}
                          title="CLIENTE ATIVO?"
                          isChecked={field.value ?? false}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                    name="classification"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="CLASSIFICAÇÃO"
                        width="w-2/3"
                        height="h-[40px]"
                        isMandatory={false}
                        placeholder="ex.: Lead Qualificado"
                        errorMessage={errors.enterpriseName?.message}
                        borderColor={errors.enterpriseName ? "border-customRedAlert" : "border-customYellow"}
                      />
                    )}
                  />
                <Controller
                  name="businessId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      title="SETOR DE NEGÓCIO"
                      isMandatory
                      options={businessSectorOptions}
                      value={
                        businessSectorOptions.find(
                          (c) => c.value === field.value
                        ) || null
                      }
                      onChange={(option) => field.onChange(option?.value)}
                      placeholder={
                        isLoadingFormData
                          ? "Carregando..."
                          : "Selecione um setor"
                      }
                      errorMessage={errors.businessId?.message}
                      width="w-full"
                    />
                  )}
                />
                <div className="flex gap-4">
                  {/* Controller agora usa 'entryDate' */}
                  <Controller
                    name="entryDate"
                    control={control}
                    render={({ field }) => (
                      <InputDate
                        isMandatory={false}
                        {...field}
                        title="DATA DE ENTRADA"
                        width="w-1/2"
                        errorMessage={errors.entryDate?.message}
                        borderColor={errors.entryDate ? "#EF4444" : "#F6BC0A"}
                      />
                    )}
                  />
                  <Controller
                    name="contractEndDate"
                    control={control}
                    render={({ field }) => (
                      <InputDate
                        {...field}
                        isMandatory={false}
                        title="DATA DE FIM CONTRATO"
                        width="w-1/2"
                        errorMessage={errors.contractEndDate?.message}
                        borderColor={errors.contractEndDate ? "#EF4444" : "#F6BC0A"}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="contractDescription"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      isMandatory={false}
                      {...field}
                      title="DESCRIÇÃO DO CONTRATO"
                      placeholder="Digite um resumo do contrato..."
                      height="h-[100px]"
                      errorMessage={errors.contractDescription?.message}
                      borderColor={errors.contractDescription ? "border-customRedAlert" : "border-customYellow"}
                    />
                  )}
                />
                {/* Controller agora usa 'briefing' */}
                <Controller
                  name="briefing"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      title="BRIEFING"
                      isMandatory={false}
                      placeholder="Digite o briefing do cliente..."
                      height="h-[100px]"
                      errorMessage={errors.briefing?.message}
                      borderColor={errors.briefing ? "border-customRedAlert" : "border-customYellow"}
                    />
                  )}
                />
              </div>

              <InputTitle title="Responsável pelo Cliente" />
              <div className="flex flex-col gap-4">
                <Controller
                  name="contactName"
                  control={control}
                  render={({ field }) => (
                    <InputString
                      height="h-[40px]"
                      {...field}
                      title="NOME DO RESPONSÁVEL"
                      width="w-2/3"
                      isMandatory
                      placeholder="Digite o nome..."
                      errorMessage={errors.contactName?.message}
                      borderColor={errors.contactName ? "border-customRedAlert" : "border-customYellow"}
                    />
                  )}
                />
                <div className="flex gap-4">
                  <Controller
                    name="contactPhone"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        height="h-[40px]"
                        {...field}
                        title="NÚMERO PARA CONTATO"
                        width="w-1/2"
                        isMandatory
                        placeholder="(__) _____-____"
                        mask="(00) 00000-0000"
                        errorMessage={errors.contactPhone?.message}
                        borderColor={errors.contactPhone ? "border-customRedAlert" : "border-customYellow"}
                      />
                    )}
                  />
                  <Controller
                    name="contactEmail"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        isMandatory={false}
                        height="h-[40px]"
                        {...field}
                        title="E-MAIL PARA CONTATO"
                        width="w-1/2"
                        placeholder="Digite o e-mail..."
                        errorMessage={errors.contactEmail?.message}
                        borderColor={errors.contactEmail ? "border-customRedAlert" : "border-customYellow"}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full mt-10 justify-center">
                <ColoredButton
                  type="submit"
                  title={isPending ? "CADASTRANDO..." : "CADASTRAR CLIENTE"}
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

export default CreateClient;
