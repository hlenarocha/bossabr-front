import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import InputString from "@/components/shared/InputString";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // desconstruindo objeto {}
  console.log(user?.url_avatar);

  return (
    <>
      <BaseScreen>
        <PageTitle icon="fa-solid fa-gear" marginTop="mt-4" title="Configurações"></PageTitle>
        <Motion>
          <Box title={`Olá, {user}`} width="w-full" height="h-fit">
            <div className="flex flex-row gap-6">
              <div className="w-1/3 flex items-center justify-center">
                <div className="w-36 h-36  flex justify-center items-center bg-white bg-opacity-50 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255, 255, 255, 0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)]">
                  <img
                    className="rounded-full w-32 h-32"
                    src={user?.url_avatar}
                  ></img>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="flex flex-row gap-4 w-full">
                    <InputString
                      title="NOME"
                      placeholder={user?.first_name || ""}
                      isMandatory={false}
                      height="h-8"
                      width="w-fit"
                      isReadOnly={true}
                    />
                    <InputString
                      title="DATA DE NASCIMENTO"
                      placeholder={""}
                      isMandatory={false}
                      width="w-fit"

                      height="h-8"
                      isReadOnly={true}
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <InputString
                      title="E-MAIL"
                      placeholder={""}
                      width="w-fit"

                      isMandatory={false}
                      height="h-8"
                      isReadOnly={true}
                    />
                 
                    <InputString
                      title="TELEFONE"
                      placeholder={""}
                      isMandatory={false}
                      width="w-fit"
                      height="h-8"
                      isReadOnly={true}
                    />
                </div>
              </div>
            </div>
          </Box>
        </Motion>
        <Motion>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <Box
              title="Colaboradores"
              subtitle="Veja, altere ou exclua as informações pertinentes aos colaboradores."
              width="md:w-[50%]"
              height="h-[378px]"
            >
              <div className="flex flex-col gap-4 items-center">
                <ColoredButton
                  onClick={() => navigate("/configuracoes/colaboradores")}
                  justify="justify-between"
                  width="w-full"
                  icon="fa solid fa-arrow-right"
                  color="customYellow"
                  title="CONFIGURAR COLABORADORES"
                ></ColoredButton>
                <ColoredButton
                  onClick={() => navigate("/configuracoes/equipes")}
                  justify="justify-between"
                  width="w-full"
                  icon="fa solid fa-arrow-right"
                  color="customYellow"
                  title="CONFIGURAR EQUIPES"
                ></ColoredButton>
                {/* <ColoredButton
                  onClick={() => navigate("/configuracoes/setores")}
                  justify="justify-between"
                  width="w-full"
                  icon="fa solid fa-arrow-right"
                  color="customYellow"
                  title="CONFIGURAR SETORES"
                ></ColoredButton> */}
              </div>
            </Box>

            <Box
              title="Clientes"
              subtitle="Veja, altere ou exclua as informações pertinentes aos clientes."
              width="md:w-[50%]"
              height="h-[378px]"
            >
              <div className="flex flex-col gap-4 items-center">
                <ColoredButton
                  onClick={() => navigate("/configuracoes/clientes")}
                  justify="justify-between"
                  width="w-full"
                  icon="fa solid fa-arrow-right"
                  color="customYellow"
                  title="CONFIGURAR CLIENTES"
                ></ColoredButton>
                <ColoredButton
                  onClick={() => navigate("/configuracoes/negocios")}
                  justify="justify-between"
                  width="w-full"
                  icon="fa solid fa-arrow-right"
                  color="customYellow"
                  title="CONFIGURAR SETORES DE NEGÓCIO"
                ></ColoredButton>
              </div>
            </Box>
          </div>
        </Motion>
        <Motion>
          <Box
            title="Demandas"
            subtitle="Veja, altere ou exclua as informações pertinentes às demandas."
            width="md:w-[50%]"
            height="h-[378px]"
          >
            <div className="flex flex-col gap-4 items-center">
              <ColoredButton
                onClick={() => navigate("/configuracoes/demandas")}
                justify="justify-between"
                width="w-full"
                icon="fa solid fa-arrow-right"
                color="customYellow"
                title="CONFIGURAR DEMANDAS"
              ></ColoredButton>
              <ColoredButton
                onClick={() => navigate("/configuracoes/servicos")}
                justify="justify-between"
                width="w-full"
                icon="fa solid fa-arrow-right"
                color="customYellow"
                title="CONFIGURAR TIPOS DE SERVIÇO"
              ></ColoredButton>
            </div>
          </Box>
        </Motion>
        <ScrollToEndArrow />
      </BaseScreen>
    </>
  );
};

export default SettingsScreen;
