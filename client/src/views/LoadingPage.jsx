function LoadingPage({ text }) {
  return (
    <>
      <div className="container justify-center">
        <p className="w-full text-text-primary text-center">
          {text ? text : "Loading..."}
        </p>
      </div>
    </>
  );
}

export default LoadingPage;
