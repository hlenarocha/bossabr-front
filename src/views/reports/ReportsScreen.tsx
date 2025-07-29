import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import InputTitle from "@/components/title/InputTitle";
import TableItem from "@/components/table/TableItem";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const ReportScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <BaseScreen>
      <div className="flex flex-col items-center lg:justify-between lg:flex-row">
        <PageTitle
          icon="fa-solid fa-book"
          marginTop="mt-4"
          title="Diário de {user}"
        ></PageTitle>
        <ColoredButton
          onClick={() => {
            navigate("/reports");
          }}
          width="w-fit"
          title="BAIXAR RELATÓRIO DIÁRIO"
          icon="fa-solid fa-download"
          marginTop="mt-6"
          color="customYellow"
          justify="justify-center"
        ></ColoredButton>
      </div>
      <Motion>
        <Box
          title="Diário de Atividades"
          subtitle="Visualize as atividades realizadas no dia {dd / mm / YYYY}"
          width="w-full"

          height="h-fit"
        >
          <div className="flex flex-row gap-2 w-full mb-4">
            <InputString
              title="NOME"
              placeholder={user?.first_name || ""}
              isMandatory={false}
              height="h-8"
              width="w-1/3"
              isReadOnly={true}
            ></InputString>
            <InputString
              title="EQUIPE"
              placeholder={user?.nome_equipe || ""}
              isMandatory={false}
              height="h-8"
              width="w-1/3"
              isReadOnly={true}
        ></InputString>

            <InputString
              title="SETOR"
              placeholder={user?.nome_setor || ""}
              isMandatory={false}
              height="h-8"
              width="w-1/3"
              isReadOnly={true} />
          </div>

          <InputTitle title="Atividades do dia" />
          <TableItem
            columns={[
              // {
              //   width: "10%",
              //   content: "ID REGISTRO",
              // },
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
                      onClick={() => navigate("/reports/details")}
                    ></i>
                  ),
                },
              ]}
              isTableHeader={false}
              itemHeight="h-12"
            />

          </div>
          <div className="flex w-full mt-10 justify-center"></div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};
export default ReportScreen;
