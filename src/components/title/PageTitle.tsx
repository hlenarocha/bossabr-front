import { useHelp } from '@/contexts/HelpContext'; 

interface PageTitleProps {
  title: string;
  marginTop?: string;
  icon?: string;
  width?: string;
}

const PageTitle = (props: PageTitleProps) => {

  const { openHelp } = useHelp();

  const handleHelpClick = () => {
    // Chame a função de ajuda, passando a rota atual da janela
    openHelp(window.location.pathname);
  };

  return (
    <>
      <div className={`flex flex-row items-center gap-4 ${props.marginTop} ${props.width}`}>
        <i className={`fa-solid ${props.icon} text-4xl text-customYellow`}></i>
        <h1 className={`text-4xl  text-white cursor-default font-bold`}>
          {props.title}
        </h1>
        <i 
        className="fa-solid fa-circle-question text-2xl text-zinc-500 hover:text-customYellow cursor-pointer transition-colors"
        title="Ajuda (F1)"
        onClick={handleHelpClick}
      ></i>
      </div>
    </>
  );
};

export default PageTitle;
