
const SideBar = () => {
  return(
    <div className="h-full absolute flex w-[200px] bg-black/10 rounded-[20px] shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-2xl">
      <div className="text-white">
        <div>
            <i className="fa fa-home" aria-hidden="true"></i> Home
        </div>
      </div>
    </div>
  );
}

export default SideBar;