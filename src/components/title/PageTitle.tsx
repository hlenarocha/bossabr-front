interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return <h1 className="text-4xl text-white cursor-default font-bold">{props.title}</h1>;
};

export default PageTitle;
