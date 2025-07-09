import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";

const CreateBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousRoute = location.state?.previousRoute;

  return (
    <>
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
            width="xl:w-[1000px] w-[600px] lg:w-[800px]"
            height="h-fit"
          >
            <InputTitle title="Setor de Negócio"></InputTitle>
            <div className="w-full flex flex-col">
              <InputString
                title="NOME DO SETOR DE NEGÓCIO"
                width="w-full"
                isMandatory={true}
                placeholder="Digite o nome do setor de negócio..."
                height="h-[40px]"
              />
              
              </div>
              <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  // navigate("/reports");
                }}
                title="CADASTRAR SETOR DE NEGÓCIO"
                width="w-[40%]"
                icon={"fa-solid fa-floppy-disk"}
                color="customYellow"
                justify="justify-center"
              ></ColoredButton>
            </div>






          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateBusiness;
