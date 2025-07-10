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
import Select from "@/components/shared/Select";
import InputDate from "@/components/shared/InputDate";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import TextArea from "@/components/shared/TextArea";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { useState } from "react";

const CreateClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClientActive, setIsClientActive] = useState(false);

  const previousRoute = location.state?.previousRoute;

  return (
    <>
      <BaseScreen>
        <BackButton onClick={() => navigate(previousRoute)} />
        <PageTitle
          // icon client
          icon="fa-solid fa-user-tie"
          marginTop="mt-4"
          title={`Cadastrar Cliente`}
        ></PageTitle>
        <Motion>
          <Box
            title="Novo Cliente"
            subtitle="Preencha os dados do formulário e cadastre um novo cliente."
            width="w-full"
            height="h-fit"
          >
            <InputTitle title="Cliente"></InputTitle>

            <div className="flex flex-row items-center gap-4">
            <InputString
              title="NOME DO CLIENTE"
              width="w-2/3"
              isMandatory={true}
              placeholder="Pesquise o cliente..."
              height="h-[40px]"
            />
            <ToggleSwitch
              title="CLIENTE ATIVO?"
              isMandatory={false}
              isChecked={isClientActive}
              onChange={(e) => setIsClientActive(e.target.checked)}



            />
            </div>

            <div className="flex flex-row w-full gap-2">
              <Select
                isMandatory={false}
                title="SETOR DE NEGÓCIO"
                width="w-2/3"
                options={[{ id: 1, name: "Alimentício" }, { id: 2, name: "Varejo" },]}

              ></Select>
              <div className="mt-3 w-1/3">
                <PlainButton
                  title="NOVO SETOR DE NEGÓCIO"
                  color="bg-customYellow"
                  height="h-fit"
                  width="w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 flex-row mb-2 justify-between items-center w-[100%]">
              <InputDate

                title="DATA DE ENTRADA"
                isMandatory={false}
                width="w-1/2"

              ></InputDate>
              <InputDate

                title="DATA DE FIM CONTRATO"
                isMandatory={false}
                width="w-1/2"

              ></InputDate>
            </div>
            <TextArea
              title="DESCRIÇÃO DO CONTRATO"
              isMandatory={false}
              placeholder="Digite um resumo do contrato acordado..."
              height="h-[100px]"
            />
            <TextArea
              title="BRIEFING"
              isMandatory={false}
              placeholder="Digite o briefing do cliente..."
              height="h-[100px]"
            />
            <div className="flex mt-4">
              <InputTitle title="Responsável"></InputTitle>
            </div>
            <InputString
              title="NOME DO RESPONSÁVEL"
              width="w-2/3"
              isMandatory={true}
              placeholder="Digite o nome..."
              height="h-[40px]"
            />
            <InputString
              title="NÚMERO PARA CONTATO"
              width="w-2/3"
              isMandatory={true}
              placeholder="(__) _____-____"
              mask="(99) 99999-9999"
              height="h-[40px]"
            />
            <InputString
              title="E-MAIL PARA CONTATO"
              width="w-2/3"
              isMandatory={false}
              placeholder="Pesquise o cliente..."
              height="h-[40px]"
            />



            <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  // navigate("/reports");
                }}
                title="CADASTRAR CLIENTE"
                width="w-[40%]"
                icon={"fa-solid fa-floppy-disk"}
                color="customYellow"
                justify="justify-center"
              ></ColoredButton>
            </div>
          </Box>
        </Motion>
        <ScrollToEndArrow />
      </BaseScreen>
    </>
  );
};

export default CreateClient;