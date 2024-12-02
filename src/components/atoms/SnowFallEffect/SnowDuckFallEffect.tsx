const SnowDuckFallEffect = () => {
  return (
    <div className="absolute top-[-50px] left-0 w-full h-full pointer-events-none">
      {Array.from({ length: 3 }).map((_, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/svgs/snowDuck.svg"
          alt="Snowflake Icon"
          width={48}
          height={48}
          key={index}
          className="absolute animate-falling-snow opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 15}s`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${
              Math.random() * 90
            }deg)`,
            opacity: Math.random(),
          }}
        />
      ))}
    </div>
  );
};

export default SnowDuckFallEffect;
