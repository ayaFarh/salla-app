import { useState } from "react"
import { LuEyeOff, LuEye } from "react-icons/lu";

const PasswordForm = ({
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    labelName,
    condition,
    errorMessage,
    PasswordLight
}) => {
    const[showPassword,setShowPassword] = useState(false)
    const toggleShowPassword =()=>
        setShowPassword((prev)=>!prev)
    return (
      <div>
        <>
            <label htmlFor={name} className="max-[766px]:text-white">{labelName}</label>
          <div className="relative">
          <input 
            className={` focus:ring-0 focus:border-black max-[766px]:text-white w-full  rounded-lg border-2 bg-transparent border-black py-2 px-2 ${
                condition
                  ? ""
                  : "focus:border-gray-600"
              }`}
            type={showPassword?"text":"password"}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            />
            {PasswordLight > 0 && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className=" absolute top-1/2 -translate-y-1/2 right-2 p-2"
          >
            {showPassword && <LuEyeOff />}
            {!showPassword && <LuEye />}
          </button>
        )}
          </div>
        </>
        <div>
          {condition && <p className="text-red-600">{errorMessage}</p>}
        </div>
      </div>

    )
    
}

export default PasswordForm