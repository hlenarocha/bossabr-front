interface PageTitleProps {
  title: string;
  marginTop: string;
}

const PageTitle = (props: PageTitleProps) => {
  return <h1 className={`text-4xl ${props.marginTop} text-white cursor-default font-bold`}>{props.title}</h1>;
};

export default PageTitle;
