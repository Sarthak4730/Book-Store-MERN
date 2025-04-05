const Loader = () => {
    return <div className="h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full w-[10vw] h-[10vw] border-t-6 border-blue-400"/>
        <p className="mt-4 text-2xl">Loading...</p>
    </div>
}

export default Loader;