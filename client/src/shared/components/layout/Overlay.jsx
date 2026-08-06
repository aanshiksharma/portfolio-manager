function Overlay({ children, setOverlay }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-bg-surface-light/10 backdrop-blur-sm z-50 absolute inset-0"
        onClick={() => setOverlay(false)}
      />
      <div className="relative z-51">{children}</div>
    </div>
  );
}

export default Overlay;
