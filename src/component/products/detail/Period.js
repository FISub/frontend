function Period({ onPeriodSelect }) {
  const handlePeriod = (days) => () => {
    console.log(days);
    onPeriodSelect(days);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="row g-3 mb-4 grid-box">
        <div className="col">
          <button
            className="btn btn-outline-dark py-2 w-100 h-50"
            onClick={handlePeriod(7)}
          >
            1주
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-dark py-2 w-100 h-50"
            onClick={handlePeriod(14)}
          >
            2주
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-dark py-2 w-100 h-50"
            onClick={handlePeriod(21)}
          >
            3주
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-dark py-2 w-100 h-50"
            onClick={handlePeriod(30)}
          >
            1달
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-dark py-2 w-100 h-50"
            onClick={handlePeriod(60)}
          >
            2달
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-dark py-2 w-100 h-50"
            onClick={handlePeriod(90)}
          >
            3달
          </button>
        </div>
      </div>
    </div>
  );
}

export default Period;