interface PageTitleProps {
  title: string;
  marginTop: string;
  icon?: string;
  width?: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <>
      <div className={`flex flex-row items-center gap-4 ${props.marginTop} ${props.width}`}>
        <i className={`fa-solid ${props.icon} text-4xl text-customYellow`}></i>
        <h1 className={`text-4xl  text-white cursor-default font-bold`}>
          {props.title}
        </h1>
      </div>
    </>
  );
};

export default PageTitle;
