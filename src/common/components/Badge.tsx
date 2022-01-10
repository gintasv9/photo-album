interface Props {
  show: boolean;
}

const Badge: React.FC<Props> = ({ show, children }) => {
  if (!show) {
    return <>{children}</>;
  }

  return (
    <span className="relative inline-block">
      <span className="absolute top-0 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      {children}
    </span>
  );
};

export default Badge;
