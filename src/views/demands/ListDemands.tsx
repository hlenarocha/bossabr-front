import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import TableHeader from "@/components/table/TableHeader";
import TableItem from "@/components/table/TableItem";
import BackButton from "@/components/shared/BackButton";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/shared/SearchBar";

const ListDemands = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseScreen>
      <BackButton
          onClick={() => navigate("/demandas")}
        ></BackButton>
         <div className="flex flex-col lg:justify-between lg:flex-row">
        
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise uma demanda aqui..."
          ></SearchBar>
        </div>
        <div className="mt-4 ">
          <Box
            title="Lista de demandas"
            subtitle="Visualização de todas as demandas de forma geral ou de forma filtrada por equipe, setor, prazo ou cliente."
            width="w-full"
            height="h-[640px]"
          >
            <TableHeader
              columns={[
                { width: "w-[25%]", content: "NOME" },
                { width: "w-[25%]", content: "TIPOS DE SERVIÇO" },
                { width: "w-[25%]", content: "SETOR" },
                { width: "w-[25%]", content: "STATUS" },
              ]}
            />

            <div className="h-[70%] overflow-y-auto">
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
            </div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default ListDemands;
