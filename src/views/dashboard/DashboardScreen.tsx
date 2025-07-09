import BaseScreen from "../BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { Component } from "@/components/charts/PieChart";
import { Motion } from "@/components/animation/Motion";
import ActivityCard from "@/components/activity/ActivityCard";
import ScoreBar from "@/components/shared/ScoreBar";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import StatusSphere from "@/components/3D/StatusSphere";
import { useState } from "react";
import BlurSelect from "@/components/shared/BlurSelect";

type DemandStatus = "não iniciadas" | "em andamento" | "concluídas" | "atrasadas";

const DashboardScreen = () => {
  const [selectedOption, setSelectedOption] = useState('geral');

  const demandProgress: Record<DemandStatus, number> = {
    "não iniciadas": 15,
    "em andamento": 30,
    "concluídas": 55,
    "atrasadas": 10,
  };

  const options = [
    { value: 'geral', label: 'Dashboard Geral' },
    { value: 'design', label: 'Dasboard Setorial - Design' },
    { value: 'social-media', label: 'Dashboard Setorial - Social Media' },
  ];

  const statusStyles: Record<DemandStatus, { gradient: string }> = {
    "não iniciadas": { gradient: "from-gray-500 to-gray-700" },
    "em andamento": { gradient: "from-blue-500 to-blue-700" },
    "concluídas": { gradient: "from-green-500 to-green-700" },
    "atrasadas": { gradient: "from-red-500 to-red-700" },
  };



  return (
    <BaseScreen>

      <div className="mt-4">
        <Motion>
          {/*<div className=" md:w-[700px] gap-4 lg:w-[900px]">*/}
          <div className="flex justify-between mb-4 gap-4 ">
            <PageTitle icon="fa-solid fa-chart-pie" marginTop="mt-4" title="Dashboard"></PageTitle>
            <div className="text-white w-1/2">
              <p className="mb-2 text-xl">Dashboard Selecionado:</p>
              <BlurSelect
                options={options}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row w-full gap-4">
            <Box
              title="Progresso das Demandas"
              subtitle="Progresso das demandas do agência."
              height="h-fit"
              width="w-full"
            >
              <div className="flex flex-row flex-wrap items-center justify-center gap-8 p-4">
                {(Object.entries(demandProgress) as [DemandStatus, number][]).map(([status, count]) => (
                  <StatusSphere
                    key={status}
                    status={status}
                    count={count}
                    gradient={statusStyles[status].gradient}
                  />
                ))}
              </div>
            </Box>
          </div>

            <div className="flex flex-row w-full gap-4">
              <Box
                title="Peças Produzidas"
                subtitle="Visão geral de produtividade semanal e mensal."
                height="h-fit"
                width="w-full"
              >
                <Component />
              </Box>



              <Box
                title="Atividades"
                subtitle="Auditoria da Agência"
                width="w-full"
                height="flex-grow"


              >
                <div className="flex flex-col gap-1 h-[380px] overflow-y-auto ">
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                </div>
              </Box>


            </div>
            <div className="flex flex-row w-full gap-4">
              <Box
                title="Pontuação Acumulada"
                subtitle="Pontuação acumulada do {setor}."
                height="h-fit"
                width="w-full"
              >
                <div className="h-[200px] flex flex-col overflow-y-auto]">
                  <ScoreBar user="Nome" />
                  <ScoreBar user="Nome" />
                  <ScoreBar user="Nome" />
                </div>

              </Box>
              <Box
                title="Setores de Negócio"
                subtitle="Visão dos setores de negócio dos clientes da agência."
                height="h-fit"
                width="w-full"
              >
                <Component />
              </Box>
            </div>
          {/*</div>*/}
        </Motion>
      </div>
      <ScrollToEndArrow />

    </BaseScreen>
  );
};

export default DashboardScreen;
