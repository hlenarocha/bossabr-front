// hooks e bibliotecas
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";
import StatusTag from "@/components/shared/StatusTag";
import DeadlineDisplay from "@/components/shared/DeadlineDisplay";
import CreateActivityModal from "@/views/activities/CreateActivityModal";

// API, hooks e tipos
import { useReadDemandById } from "@/hooks/demands/useReadDemandById";

const DemandDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const demandId = Number(id);
  const location = useLocation();



  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: demand, isLoading, isError } = useReadDemandById(demandId);

  // A API precisa retornar o tipo de serviço (ex: 'design') para o modal funcionar.
  // Se o nome do setor for retornado, podemos usá-lo para inferir o tipo.
  const inferActivityType = (
    sectorName: string | undefined
  ): "design" | "social_media" => {
    if (sectorName?.toLowerCase().includes("design")) return "design";
    return "social_media"; // Padrão para Social Media ou outros
  };

  // VER SE FUNCIONA
  const previousRoute = location.state?.previousRoute;
  console.log("ROTA ANTERIOR ", previousRoute);

  return (
    <>
    
      <BaseScreen>
        <BackButton onClick={() => navigate(previousRoute)} />
        <div className="flex flex-row justify-between"> 
          <PageTitle
            marginTop="mt-4"
            icon="fa-solid fa-file-invoice"
            title="Detalhes da Demanda"
          />
          <ColoredButton
            title="HISTÓRICO DA DEMANDA"
            icon="fa-solid  fa-history"
            tip="Ver histórico"
            onClick={() => navigate(`/demandas/${demandId}/historico`)}
          />
        </div>

        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={demand?.nome_servico || "Carregando..."}
            subtitle={`Cliente: ${demand?.nome_empresa || ""}`}
          >
            <StatusView isLoading={isLoading} isError={isError}>
              {demand && (
                <>
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
                    <InputString
                      title="RESPONSÁVEL"
                      placeholder={
                        demand.first_name + " " + (demand.last_name || "")
                      }
                      isReadOnly
                      width="w-full sm:w-1/2"
                      height="h-8"
                    />
                    <div className="flex gap-4 w-full sm:w-auto sm:justify-end">
                      <div>
                        <p className="text-white font-bold text-sm mb-1">
                          STATUS
                        </p>
                        <StatusTag status={demand.status} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm mb-1">
                          PRAZO
                        </p>
                        <DeadlineDisplay prazo={demand.prazo} />
                      </div>
                    </div>
                  </div>

                  <InputTitle title="Detalhes do Serviço" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <InputString
                      title="CLIENTE"
                      placeholder={demand.nome_empresa}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="TIPO DE SERVIÇO"
                      placeholder={demand.nome_servico}
                      isReadOnly
                      height="h-8"
                    />
                  </div>
                  <div className="mt-4">
                    <InputString
                      title="DESCRIÇÃO"
                      placeholder={
                        demand.descricao || "Nenhuma descrição fornecida."
                      }
                      isReadOnly
                      height="h-8"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InputString
                      title="LINK DO DRIVE"
                      placeholder={
                        demand.link_drive || "Nenhum link fornecido."
                      }
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="QUANTIDADE"
                      placeholder={String(demand.quantidade)}
                      isReadOnly
                      height="h-8"
                    />
                  </div>

                  <div className="flex justify-center mt-10">
                    <ColoredButton
                      onClick={() => setIsModalOpen(true)}
                      title="REGISTRAR ATIVIDADE"
                      icon="fa-solid fa-plus"
                      color="customYellow"
                      width="w-full md:w-1/2"
                      justify="justify-center"
                    />
                  </div>
                </>
              )}
            </StatusView>
          </Box>
        </Motion>
      </BaseScreen>

      {isModalOpen && demand && (
        <CreateActivityModal
          demandId={demandId}
          activityType={inferActivityType("design")} // SÓ PARA TESTE - MUDAR
          onClose={() => setIsModalOpen(false)}
          setToast={(message, type) => {
            console.log(`Toast message: ${message}, Type: ${type}`);
          }} // colocar um toast aqui!!!
        />
      )}
    </>
  );
};

export default DemandDetails;
