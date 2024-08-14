function Period(){
    return(
        <div style={{ width: "100%" }}>
              <div className="row g-3 mb-4 grid-box">
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    1주
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    2주
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    3주
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    1달
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    2달
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    3달
                  </button>
                </div>
              </div>
            </div>
    );
}

export default Period;