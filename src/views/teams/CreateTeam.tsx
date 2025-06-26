import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import InputString from "@/components/shared/InputString";
import PlainButton from "@/components/shared/PlainButton";
import ColoredButton from "@/components/shared/ColoredButton";

const CreateTeam = () => {
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
          title={`Cadastrar Equipe`}
        ></PageTitle>
        <Motion>
          <Box
            title="Nova Equipe"
            subtitle="Preencha os dados do formulário e cadastre uma nova equipe."
            width="xl:w-[1000px] w-[600px] lg:w-[800px]"
            height="h-fit"
          >
            <InputTitle title="Equipe"></InputTitle>
            <div className="w-full flex flex-col">
              <InputString
                title="NOME DA EQUIPE"
                width="w-full"
                isMandatory={true}
                placeholder="Pesquise o cliente..."
                height="h-[40px]"
              />
              <div className="flex gap-6 flex-row">
                <InputString
                  title="NOME DO SETOR"
                  width="w-2/3"
                  isMandatory={true}
                  placeholder="Pesquise o cliente..."
                  height="h-[40px]"
                />
                <div className="mt-auto mb-3 w-1/3">
                  <PlainButton
                    title="NOVO SETOR"
                    color="bg-customYellow"
                    height="h-10"
                    width="w-full"
                  />
                </div>
              </div>
              <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  // navigate("/reports");
                }}
                title="SALVAR EQUIPE"
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

export default CreateTeam;
