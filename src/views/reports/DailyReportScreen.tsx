// hooks e bibliotecas
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Componentes
import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import InputTitle from "@/components/title/InputTitle";
import TableItem from "@/components/table/TableItem";
import ColoredButton from "@/components/shared/ColoredButton";
import { Motion } from "@/components/animation/Motion";
import BackButton from "@/components/shared/BackButton";
import InputDate from "@/components/shared/InputDate";

// Contexto
import { UserContext } from "@/contexts/UserContext";

const DailyReportScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const cameFromAdminList = location.state?.from === "/diarios/admin";

  const [reportDate, setReportDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleGenerateReport = () => {
    if (!user) return;
    console.log(
      `Gerando relatório para o usuário ID: ${user.id_pessoa} na data: ${reportDate}`
    );
    // Futuramente, aqui virá a chamada para a API
  };

  return (
    <BaseScreen>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-4">
          {cameFromAdminList && (
            <BackButton onClick={() => navigate("/diarios")} />
          )}
          <PageTitle
            icon="fa-solid fa-book"
            title={`Diário de ${user?.first_name || ""} ${
              user?.last_name || ""
            }`}
          />
        </div>
        <ColoredButton
          onClick={handleGenerateReport}
          width="w-full sm:w-fit"
          title="BAIXAR RELATÓRIO"
          icon="fa-solid fa-file-arrow-down"
          color="customYellow"
          justify="justify-center"
        />
      </div>

      <Motion>
        <Box
          title="Diário de Atividades"
          subtitle="Selecione um dia para visualizar as atividades registradas ou preencher um novo relatório."
          width="w-full"
          height="h-fit"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InputDate
              isMandatory={false}
              title="DATA SELECIONADA"
              value={reportDate}
              onChange={(value: string) => setReportDate(value)}
              height="h-10"
            />
            <InputString
              title="NOME"
              placeholder={`${user?.first_name || ""} ${user?.last_name || ""}`}
              isReadOnly
              height="h-10"
            />
            <InputString
              title="EQUIPE - SETOR"
              placeholder={`${user?.nome_equipe || "N/A"} - ${
                user?.nome_setor || "N/A"
              }`}
              isReadOnly
              height="h-10"
            />
          </div>

          {/* --- TABELA DE ATIVIDADES --- */}
          <InputTitle
            title={
              <div className="flex items-center gap-4">
                <span>Atividades do dia</span>
                <div className="bg-zinc-800 text-customYellow font-bold py-1 px-3 rounded-lg inline-flex items-center gap-2 text-sm">
                  <i className="fa-solid fa-calendar-day"></i>
                  {format(
                    new Date(reportDate + "T12:00:00"),
                    "dd 'de' MMMM 'de' yyyy",
                    { locale: ptBR }
                  )}
                </div>
              </div>
            }
          />
          <TableItem
            columns={[
              { width: "20%", content: "EQUIPE" },
              { width: "20%", content: "SETOR" },
              { width: "30%", content: "OBSERVAÇÃO" },
              { width: "20%", content: "STATUS" },
              { width: "10%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

          <div className="h-[350px] overflow-y-auto">
            <TableItem
              columns={[
                { width: "20%", content: "Equipe A" },
                { width: "20%", content: "Setor X" },
                { width: "30%", content: "Atividade realizada com sucesso." },
                { width: "20%", content: "Concluído" },
                {
                  width: "10%",
                  content: (
                    <i
                      className="fa-solid fa-eye text-lg text-customYellow hover:cursor-pointer"
                      title="Visualizar Detalhes"
                      onClick={() => navigate("/reports/details")} // MODIFICAR
                    ></i>
                  ),
                },
              ]}
              itemHeight="h-12"
            />
          </div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};
export default DailyReportScreen;
