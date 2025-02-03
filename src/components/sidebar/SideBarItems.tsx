
interface SideBarItemsProps {
  icon: string;
  title: string;
}

const SideBarItems = (prop: SideBarItemsProps) => {
  return (
    <>
    <div className="text-white flex flex-row items-center p-5 w-full">
      <i className={prop.icon} aria-hidden="true"></i>
      <div className="ml-5">{prop.title}</div>
    </div>

    </>

  );
}

export default SideBarItems;