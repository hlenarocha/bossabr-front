import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "./BaseScreen";
import Box from "@/components/box/BoxContent";

const ReportScreen = () => {
  return (
    <BaseScreen>
    <PageTitle marginTop="mt-4" title="Relatório Diário de {user}"></PageTitle>
    <Box 
    width="w-[100%]"
    height="h-[378px]"
    title="Relatório Diário"
    subtitle="Visualize os dados de pontuação, progresso das demandas e atividades no dia selecionado."

    ><div className="text-customYellow text-xl">RELATÓRIO AQUI</div></Box>
    </BaseScreen>
  );
};
export default ReportScreen;
