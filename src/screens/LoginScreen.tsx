import { GoogleOAuthProvider } from "@react-oauth/google";
import Background3D from "../components/3D/Background3D";
import LoginCard from "../components/login/LoginCard";


const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-customGray overflow-hidden">
      <Background3D />

    {/* Cliente id do google */}
      <GoogleOAuthProvider clientId={googleClientId}>
        <LoginCard />
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
