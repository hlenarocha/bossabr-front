const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0  right-0 bottom-0 backdrop-blur-sm cursor-default bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="flex flex-col text-white gap-8 justify-center items-center">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-4 border"></div> */}
        <div className="w-12 h-12 bg-customYellow rounded-full animate-pulse"></div>
        <p className="font-alatsi text-3xl font-bold">MKTFlow</p>
        <p className="font-sans text-xl bg-black rounded-full p-10 bg-opacity-40">
          Organizando o <i className="text-customYellow">flow </i> do trabalho criativo, <br /> acelerando entregas transformadoras.
        </p>
      
      </div>
    </div>
  );
};

export default LoadingScreen;
