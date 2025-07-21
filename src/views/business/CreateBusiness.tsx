// hooks e bibliotecas
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// API e schemas
import { businessSchema, BusinessFormData } from "@/schemas/businessSchema";

// componentes
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";

// ícones
import IconSad from "@/assets/images/famicons_sad.png";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { BusinessDTO, createBusiness } from "@/api/businessRoutes";

const CreateBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousRoute = location.state?.previousRoute;

  // Hook personalizado para lidar com mutações de criação de setores de negócio
  const {
    mutate,
    isPending,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal,
  } = useResourceMutation<BusinessDTO>({
    // função de API específica
    mutationFn: ({ payload }) => createBusiness(payload),
    // mensagens e rotas de sucesso/erro
    successToastMessage: "Setor de negócio cadastrado com sucesso!",
    successNavigationRoute: "/configuracoes/negocios",
    errorModalMessage:
      "Não foi possível cadastrar o setor. Verifique os dados e tente novamente.",
  });

  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
    },
    mode: "onChange", // valida campo à medida que user digita
  });

  const onSubmit = (data: BusinessFormData) => {
    const payload: BusinessDTO = { nome_setor_negocio: data.businessName };
    mutate({ payload });
  };

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
          // icon client
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title={`Cadastrar Setor de Negócio`}
        ></PageTitle>
        <Motion>
          <Box
            title="Novo Setor de Negócio"
            subtitle="Preencha os dados do formulário e cadastre um novo setor de negócio."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputTitle title="Setor de Negócio"></InputTitle>
              <div className="w-full flex flex-col">
                {/* controller conecta InputString ao React Hook Form */}
                <Controller
                  name="businessName"
                  control={control}
                  render={({ field }) => (
                    <InputString
                      {...field} // Passa as props (onChange, onBlur, value) para o input
                      title="NOME DO SETOR DE NEGÓCIO"
                      width="w-full"
                      isMandatory={true}
                      placeholder="Digite o nome do setor de negócio..."
                      height="h-[40px]"
                      errorMessage={errors.businessName?.message}
                      // muda a cor da borda em caso de erro
                      borderColor={
                        errors.businessName
                          ? "border-customRedAlert"
                          : "border-customYellow"
                      }
                    />
                  )}
                />
              </div>
              <div className="flex w-full mt-10 justify-center">
                <ColoredButton
                  title={
                    isPending ? "CADASTRANDO..." : "CADASTRAR SETOR DE NEGÓCIO"
                  }
                  type="submit"
                  width="w-[40%]"
                  icon={"fa-solid fa-floppy-disk"}
                  color="customYellow"
                  justify="justify-center"
                ></ColoredButton>
              </div>
            </form>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateBusiness;
