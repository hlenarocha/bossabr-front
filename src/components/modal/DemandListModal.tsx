import Modal from "@/components/modal/Modal";
import TableItem from "@/components/table/TableItem";
import { useNavigate } from "react-router-dom";
import { DemandDetailItem } from "@/api/dashboardRoutes"; // Importe a interface que já criamos

interface DemandListModalProps {
  isOpen: boolean;
  onClose: () => void;
  statusTitle: string;
  demands: DemandDetailItem[];
}

const DemandListModal = ({ isOpen, onClose, statusTitle, demands }: DemandListModalProps) => {
  const navigate = useNavigate();
  const statusIconColors: Record<string, string> = {
    "Não iniciada": "text-zinc-400",
    "Em andamento": "text-blue-500",
    "Em aprovação": "text-purple-500",
    "Atrasada": "text-red-500",
    "Concluída": "text-emerald-500",
};
  return (
    <Modal
      isModalVisible={isOpen}
      title={`Demandas com Status: ${statusTitle}`}
      iconName="fa-solid fa-clipboard-list"
      buttonTitle1="FECHAR"
      onClick1={onClose}
      iconColor={statusIconColors[statusTitle] || "text-gray-500"}
      width="w-11/12 max-w-4xl" 
    >
      <div className="flex flex-col h-[450px]">
        <TableItem
          columns={[
            { width: "50%", content: "SERVIÇO" },
            { width: "40%", content: "CLIENTE" },
            { width: "10%", content: "AÇÕES" },
          ]}
          isTableHeader={true}
        />
        <div className="flex-grow overflow-y-auto pr-2">
          {demands.length > 0 ? (
            demands.map((demand) => (
              <TableItem
                key={demand.id_demanda}
                columns={[
                  { width: "50%", content: <div className="truncate" title={demand.descricao}>{demand.nome_servico}</div> },
                  { width: "40%", content: demand.nome_empresa },
                  {
                    width: "10%",
                    content: (
                      <button
                        onClick={() => navigate(`/demandas/${demand.id_demanda}`)}
                      >
                        <i className="fa-solid text-customYellow fa-eye mr-2"></i>
                      </button>
                    ),
                  },
                ]}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400">
                <p>Nenhuma demanda para detalhar.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DemandListModal;