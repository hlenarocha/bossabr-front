
interface SideBarItemsProps {
  icon: string;
  title: string;
}

const SideBarItems = (prop: SideBarItemsProps) => {
  return (
    <>
    <div className="text-white text-[16px] flex flex-row items-center p-5 w-full cursor-pointer">
      <i className={prop.icon} aria-hidden="true"></i>
      <div className="ml-5 font-black">{prop.title}</div>
    </div>

    </>

  );
}

export default SideBarItems;