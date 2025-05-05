const LoadingSpinner = () => {
  return (

    <div className="fixed top-0 left-0  right-0 bottom-0 backdrop-blur-sm cursor-default bg-black bg-opacity-10 z-50 flex items-center justify-center">
      <div className="flex flex-col text-white gap-8 justify-center items-center">
        <div className="w-12 h-12 rounded-full animate-spin border-customYellow border border-t-4"></div>
        <p>Carregando dados...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;