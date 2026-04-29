function Overlay({ children }) {
  return (
    <div
      className={`
        bg-bg-surface-light/10 backdrop-blur-sm
        flex items-center justify-center
        z-50 fixed inset-0
      `}
    >
      {children}
    </div>
  );
}

export default Overlay;
