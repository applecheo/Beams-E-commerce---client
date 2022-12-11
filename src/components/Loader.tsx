const Loader = () => {
    const circleCommonClasses = "h-3 w-3 m-1 bg-current   rounded-full";

    return (
        <div className="flex">
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;
