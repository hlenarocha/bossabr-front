import { GoogleOAuthProvider } from "@react-oauth/google";
import Background3D from "../components/3D/Background3D";
import LoginCard from "../components/login/LoginCard";

const App = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-customGray overflow-hidden">
      <Background3D />

    {/* Cliente id do google */}
      <GoogleOAuthProvider clientId="1021397316105-8bhmiu5d8ela5dsaoomf7rgued8hc6do.apps.googleusercontent.com">
        <LoginCard />
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
