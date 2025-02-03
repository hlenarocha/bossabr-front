
interface LoginInputProps {
    placeholder: string;
}

const LoginInput = (prop: LoginInputProps) => {
    return (
        <>
            <input className="w-full max-w-[371px] h-[38px] bg-[#fffffe] rounded-[10px] shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)] p-4 mt-5 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#F6BC0A]" placeholder={prop.placeholder}></input>
        </>
    );
}

export default LoginInput;