function UploadingOverlay() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col gap-1 items-center justify-center bg-bg-base/10 backdrop-blur-sm">
        <h2 className="text-xl text-text-primary">Uploading your project!</h2>
        <p>Please Wait...</p>
      </div>
    </>
  );
}

export default UploadingOverlay;
