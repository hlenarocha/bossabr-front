import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";

const CreateSector = () => {
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
          title={`Cadastrar Setor`}
        ></PageTitle>
        <Motion>
          <Box
            title="Novo Setor"
            subtitle="Preencha os dados do formulário e cadastre um setor."
            width="max-w-[100%] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]"
            height="h-fit"
          >
            <InputTitle title="Setor"></InputTitle>
            <div className="w-full flex flex-col">
              <InputString
                title="NOME DO SETOR"
                width="w-full"
                isMandatory={true}
                placeholder="Digite o nome..."
                height="h-[40px]"
              />
             
              <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  // navigate("/reports");
                }}
                title="CADASTRAR SETOR"
                width="w-[40%]"
                icon={"fa-solid fa-floppy-disk"}
                color="customYellow"
                justify="justify-center"
              ></ColoredButton>
            </div>
            </div>

          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateSector;
