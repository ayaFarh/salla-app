 const ButtonForm =({
    type="submit",
    children,
    loading,
    onClick,
    className = ""
})=>{

    return(
        <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`relative cursor-pointer flex justify-center items-center bg-black h-[40px] px-5 rounded text-white hover:opacity-85 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className={`flex items-center ${loading ? "invisible" : "visible"}`}>
        {children}
      </span>

      {loading && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/loadingSpinnerW.svg" alt="Loading..." className="w-[20px]" />
        </span>
      )}
    </button>

    )
}

export default ButtonForm