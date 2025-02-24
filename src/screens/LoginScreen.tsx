import { GoogleOAuthProvider } from "@react-oauth/google";
import Background3D from "../components/3D/Background3D";
import LoginCard from "../components/login/LoginCard";

const App = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-customGray overflow-hidden">
      <Background3D />

      <GoogleOAuthProvider clientId="695943838408-tl69kga1kmuot0u0jhmbgduos3d4gtnj.apps.googleusercontent.com">
        <LoginCard />
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
