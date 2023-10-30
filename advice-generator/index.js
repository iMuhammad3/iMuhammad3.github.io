const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
    const [advice, setAdvice] = React.useState({});
    const [count, setCount] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [screen, setScreen] = React.useState(window.innerWidth);
    
    React.useEffect(() => {
        function resize(){
            setScreen(window.innerWidth)
        }
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [screen])

    React.useEffect(() => {
        setIsLoaded(false);
        try {
            fetch("https://api.adviceslip.com/advice")
                .then(resp => resp.json())
                .then(data => {
                    setAdvice(data.slip);
                    setIsLoaded(true);
                });
        } catch (err) {
            setAdvice({ id: 0, advice: "An Error occured" });
        }
    }, [count]);

    function handleClick() {
        setCount(prevCount => prevCount + 1);
    }

    const pattern_divider_mobile = (
        <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
                <g transform="translate(138)" fill="#CEE3E9">
                    <rect width="6" height="16" rx="3" />
                    <rect x="14" width="6" height="16" rx="3" />
                </g>
            </g>
        </svg>
    )
    const pattern_divider_desktop = (
        <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                <g transform="translate(212)" fill="#CEE3E9">
                    <rect width="6" height="16" rx="3" />
                    <rect x="14" width="6" height="16" rx="3" />
                </g>
            </g>
        </svg>
    )

    return (
        <div className="relative select-none bg-dark-grayish-blue text-cyan-50 flex flex-col items-center gap-2 w-96 md:w-[500px] rounded-xl shadow-lg px-6 py-10">
            <h4 className="text-neon-green">ADVICE #{advice.id}</h4>
            <p className="flex items-center justify-center text-2xl text-center min-h-[150px] px-3">
                "{advice.advice}"
            </p>
            <div className="mb-6">
                {screen > 768
                    ? pattern_divider_desktop
                    : pattern_divider_mobile}
            </div>
            <DiceSvg handleClick={handleClick} isLoaded={isLoaded} />
        </div>
    );
}
function DiceSvg({ handleClick, isLoaded }) {
    return (
        <div
            onClick={handleClick}
            className={`${
                !isLoaded && "animate-pulse"
            } cursor-pointer w-14 h-14 bg-neon-green flex items-center justify-center rounded-full shadow absolute bottom-0 translate-y-1/2 [&>svg]:hover:rotate-45`}
        >
            <svg
            className="transition"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                fill="#202733"
            />
        </svg>
        </div>
    );
}
svg