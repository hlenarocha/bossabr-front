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
import SearchableSelect from "@/components/shared/SearchableSelect";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";

// API, schemas, hooks e assets
import { workerSchema, WorkerFormData } from "@/schemas/workerSchema";
import { createWorker, getWorkerFormData, WorkerDTO } from "@/api/workerRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import IconSad from "@/assets/images/famicons_sad.png";

const CreateWorker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.previousRoute;

  // Busca os dados para os selects (cargos e equipes)
  const { data: formData, isLoading: isLoadingFormData } = useQuery<{
    cargos: { id_cargo: number; cargo: string }[];
    equipes: { id_equipe: number; nome_equipe: string; nome_setor: string }[];
  }>({
    queryKey: ["workerFormData"],
    queryFn: getWorkerFormData,
  });

  const {
    mutate,
    isPending,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal,
  } = useResourceMutation<WorkerDTO>({
    mutationFn: ({ payload }) => createWorker(payload),
    successToastMessage: "Colaborador cadastrado com sucesso!",
    successNavigationRoute: previousRoute || "/configuracoes/colaboradores",
    errorModalMessage: "Não foi possível cadastrar o colaborador.",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cnpj: "",
      roleId: undefined,
      teamId: undefined,
      email: "",
      phone: "",
      birthDate: "",
      entryDate: "",
    },
    mode: "onChange",
  });

  // Mapeia os dados do formulário para o formato da API e envia
  const onSubmit = (data: WorkerFormData) => {
    const payload: WorkerDTO = {
      first_name: data.firstName,
      last_name: data.lastName,
      cnpj: data.cnpj || "",
      email: data.email,
      telefone: data.phone,
      data_nascimento: data.birthDate || "",
      data_entrada: data.entryDate || "",
      id_cargo: data.roleId,
      id_equipe: data.teamId,
    };
    mutate({ payload });

    console.log("DADOS SENDO ENVIADOS: ", payload);
  };

  // Prepara as opções para os selects
  const roleOptions =
    formData?.cargos?.map((role) => ({
      value: role.id_cargo,
      label: role.cargo,
    })) || [];
  const teamOptions =
    formData?.equipes?.map((team) => ({
      value: team.id_equipe,
      label: `${team.nome_equipe} - ${team.nome_setor}`, // Concatenação aqui!
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
          onClick={() =>
            navigate(previousRoute || "/configuracoes/colaboradores")
          }
        />
        <PageTitle
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title="Cadastrar Colaborador"
        />
        <Motion>
          <Box
            title="Novo Colaborador"
            subtitle="Cadastre um colaborador aqui."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Dados Pessoais" />
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="NOME"
                        width="w-1/2"
                        isMandatory
                        placeholder="Digite o nome..."
                        errorMessage={errors.firstName?.message}
                        height="h-[40px]"
                        borderColor={
                          errors.firstName
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="SOBRENOME"
                        width="w-1/2"
                        placeholder="Digite o sobrenome..."
                        errorMessage={errors.lastName?.message}
                        height="h-[40px]"
                        isMandatory={false}
                        borderColor={
                          errors.lastName
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="E-MAIL"
                        width="w-1/2"
                        isMandatory
                        placeholder="Digite o e-mail..."
                        errorMessage={errors.email?.message}
                        height="h-[40px]"
                        borderColor={
                          errors.email
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="TELEFONE"
                        width="w-1/2"
                        placeholder="(__) _____-____"
                        mask="(00) 00000-0000"
                        errorMessage={errors.phone?.message}
                        isMandatory={false}
                        height="h-[40px]"
                        borderColor={
                          errors.phone
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                </div>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <InputDate
                      {...field}
                      title="DATA DE NASCIMENTO"
                      width="w-1/2"
                      errorMessage={errors.birthDate?.message}
                      isMandatory={false}
                      height="h-[40px]"
                      borderColor={errors.birthDate ? "#EF4444" : "#F6BC0A"}
                    />
                  )}
                />
              </div>

              <InputTitle marginTop="mt-4" title="Dados Profissionais" />
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Controller
                    name="roleId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="CARGO"
                        isMandatory
                        width="w-1/2"
                        options={roleOptions}
                        value={
                          roleOptions.find(
                            (opt) => opt.value === field.value
                          ) || null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Selecione um cargo"
                        }
                        errorMessage={errors.roleId?.message}
                      />
                    )}
                  />
                  <Controller
                    name="teamId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="EQUIPE"
                        isMandatory
                        width="w-1/2"
                        options={teamOptions}
                        value={
                          teamOptions.find(
                            (opt) => opt.value === field.value
                          ) || null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Selecione uma equipe"
                        }
                        errorMessage={errors.teamId?.message}
                        height="h-[40px]"
                      />
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <Controller
                    name="entryDate"
                    control={control}
                    render={({ field }) => (
                      <InputDate
                        {...field}
                        title="DATA DE ENTRADA"
                        width="w-1/2"
                        errorMessage={errors.entryDate?.message}
                        isMandatory={false}
                        height="h-[40px]"
                        borderColor={errors.entryDate ? "#EF4444" : "#F6BC0A"}
                      />
                    )}
                  />
                  <Controller
                    name="cnpj"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="CNPJ"
                        value={field.value || ""}
                        width="w-1/2"
                        placeholder="__.___.___/____-__"
                        mask="00.000.000/0000-00"
                        errorMessage={errors.cnpj?.message}
                        height="h-[40px]"
                        isMandatory={false}
                        borderColor={
                          errors.cnpj
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex justify-center mt-6">
                <ColoredButton
                  type="submit"
                  title={isPending ? "CADASTRANDO..." : "CADASTRAR COLABORADOR"}
                  color="customYellow"
                  width="w-[40%]"
                  justify="justify-center"
                  icon="fa-solid fa-floppy-disk"
                />
              </div>
            </form>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateWorker;
