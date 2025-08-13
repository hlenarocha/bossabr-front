import BaseScreen from "../BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { Component } from "@/components/charts/PieChart";
import { Motion } from "@/components/animation/Motion";
import ActivityCard from "@/components/activity/ActivityCard";
import ScoreBar from "@/components/shared/ScoreBar";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import { useState } from "react";
import FilterSelect from "@/components/shared/FilterSelect";
import DemandProgress from "@/components/charts/DemandProgress";


const DashboardScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>("geral");

  const options = [
    { value: "geral", label: "Dashboard Geral" },
    { value: "design", label: "Dasboard Setorial - Design" },
    { value: "social-media", label: "Dashboard Setorial - Social Media" },
  ];

  return (
    <BaseScreen>
      <div className="mt-4">
        <Motion>
          {/*<div className=" md:w-[700px] gap-4 lg:w-[900px]">*/}
          <div className="flex justify-between mb-4 gap-4 ">
            <PageTitle
              icon="fa-solid fa-chart-pie"
              marginTop="mt-4"
              title="Dashboard"
            ></PageTitle>
            <div className="text-white w-1/2">
              <p className="mb-2 text-xl">Dashboard Selecionado:</p>
              <FilterSelect
                options={options}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value)}
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
              <DemandProgress />
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
                <ScoreBar score={20} />
                <ScoreBar score={10} />
                <ScoreBar score={30} />
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
