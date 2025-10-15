interface StatusSphereProps {
  status: string;
  count: number;
  gradient: string; 
  onClick?: () => void;
  hasDetails?: boolean; // 1. Adicionada nova propriedade
}

const StatusSphere = ({ status, count, gradient, onClick, hasDetails }: StatusSphereProps) => {
  return (
    // 2. Adicionado cursor condicional com base em 'hasDetails'
    <div 
      onClick={onClick} 
      className={`
        flex flex-col items-center gap-2 
        ${hasDetails ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <div
        className={`
          relative 
          w-20 h-20 
          rounded-full 
          flex items-center justify-center 
          bg-gradient-to-br ${gradient} 
          shadow-lg
          transition-transform hover:scale-105
        `}
      >
        <div 
          className="
            absolute 
            top-1 left-3 
            w-1/2 h-1/2 
            bg-white/20 
            rounded-full 
            -rotate-45 
            filter blur-xl
          "
        ></div>

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-3xl font-bold text-white drop-shadow-md">
            {count}
          </span>
        </div>
      </div>
      
      <span className="font-semibold text-gray-300 capitalize">{status}</span>
    </div>
  );
};

export default StatusSphere;