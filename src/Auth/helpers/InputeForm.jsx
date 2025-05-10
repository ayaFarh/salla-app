const InputeForm=({
    type="text",
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    labelName,
    condition,
    errorMessage,
    istextarea,

})=>{
   return(
  <div className="w-full">
    <label htmlFor={name} >{labelName}</label>
    {istextarea?
    <div>
        <textarea
    name={name}
    id={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className={`focus:ring-0 focus:border-black max-[766px]:text-white w-full  rounded-lg border-2 bg-transparent border-black py-2 px-2 ${
        condition
          ? " "
          : "focus:border-gray-600"
      }`}
  />
   {condition && (
          <p className="text-red-500 font-semibold px-2 rounded text-sm">
            {errorMessage}
          </p>
        )}
    </div>
  
    :
    <div>
        <input
    type={type}
    name={name}
    id={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className={`focus:ring-0  focus:border-black max-[766px]:text-white w-full  rounded-lg border-2 bg-transparent border-black py-2 px-2 ${
        condition
          ? ""
          : "focus:border-gray-600"
      }`}
  />
   {condition && (
          <p className="text-red-500 font-semibold  px-2 rounded text-sm">
            {errorMessage}
          </p>
        )}
    </div>
    }

  </div>

   )
}

export default InputeForm