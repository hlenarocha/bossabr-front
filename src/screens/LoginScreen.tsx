import Background3D from "../components/3D/Background3D";
import LoginCard from "../components/login/LoginCard";

const App = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-customGray overflow-hidden">
      <Background3D />
      <LoginCard />
    </div>
  );
}

export default App;