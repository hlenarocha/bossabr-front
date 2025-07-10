import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputQuantity from "@/components/shared/InputQuantity";
import InputTitle from "@/components/title/InputTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import InputString from "@/components/shared/InputString";
import PlainButton from "@/components/shared/PlainButton";
import ColoredButton from "@/components/shared/ColoredButton";
import Select from "@/components/shared/Select";
import { useState } from "react";

const CreateService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pontuation, setPontuation] = useState(0);

  const previousRoute = location.state?.previousRoute;

  return (
    <>
      <BaseScreen>
        <BackButton onClick={() => navigate(previousRoute)} />
        <PageTitle
          // icon client
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title={`Cadastrar Serviço`}
        ></PageTitle>
        <Motion>
          <Box
            title="Novo Serviço"
            subtitle="Preencha os dados do formulário e cadastre um novo serviço."
            width="w-full"

            height="h-fit"
          >
            <InputTitle title="Serviço"></InputTitle>
            <div className="w-full flex flex-col">
              <InputString
                title="NOME DO SERVIÇO"
                width="w-full"
                isMandatory={true}
                placeholder="Digite o nome do serviço..."
                height="h-[40px]"
              />
              <div className="flex gap-6 flex-row">
                <Select
                  title="SETOR RESPONSÁVEL"
                  options={[{id: 1, name: "Design"}, {id: 2, name: "Social Media"}]}
                  width="w-2/3"
                  isMandatory={true}
                  height="h-[40px]"
                />
                <div className="mt-5 w-1/3">
                  <PlainButton
                    title="NOVO SETOR"
                    color="bg-customYellow"
                    height="h-10"
                    width="w-full"
                  />
                </div>
              </div>
               <InputQuantity

                  title="PONTUAÇÃO"
                  height="h-[40px]"
                  width="w-1/3"
                  isMandatory={false}
                  value={pontuation}
                  min={0}
                  max={10}
                  onChange={(e) => setPontuation(e)}
                />
              </div>
              <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  // navigate("/reports");
                }}
                title="CADASTRAR SERVIÇO"
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

export default CreateService;
