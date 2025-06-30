
interface SideBarItemsProps {
  icon: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SideBarItems = (prop: SideBarItemsProps) => {
  return (
    <>
    <div onClick={() => prop.onClick()} className={`text-[16px] flex flex-row items-center p-5 w-full cursor-pointer 
    ${prop.isActive ? "bg-customYellow text-customTextGray hover:cursor-default" : "hover:text-customYellow text-white "}`}>
      <i className={prop.icon} aria-hidden="true"></i>
      <div className="ml-5 font-black">{prop.title}</div>
    </div>

    </>

  );
}

export default SideBarItems;