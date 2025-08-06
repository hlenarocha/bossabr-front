interface ScoreBarProps {
  score: number;
  maxScore?: number; // Tornamos a pontuação máxima opcional
}

const ScoreBar = (props: ScoreBarProps) => {
  // 1. Desestruturamos as props e definimos um valor padrão para maxScore
  const { score, maxScore = 30 } = props;

  // 2. Calculamos a porcentagem para definir a largura da barra dinamicamente
  // Garantimos que não haja divisão por zero se maxScore for 0
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  return (
    <div className="relative drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex w-full h-10 items-center rounded-full bg-zinc-800 shadow-inner mt-4">
      
      {/* Barra de progresso amarela com largura dinâmica */}
      <div
        className="absolute h-full rounded-full bg-customYellow transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />

      {/* Container para o texto, para que fique sempre por cima da barra */}
      <div className="relative flex w-full h-full items-center justify-between px-5 font-bold">
        {/* Pontuação atual */}
        <div className="text-customInputGray ">
            {score}
        </div>

        {/* Pontuação máxima */}
        <div className="text-white">
            {maxScore}
        </div>
      </div>
    </div>
  );
};

export default ScoreBar;