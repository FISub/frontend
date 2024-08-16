import React from "react";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount";


function Dashboard() {

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <h3 className="text-2xl font-bold mt-5 mb-4">대시보드</h3>
      <iframe   // kibana 실행 필요 
        src="http://localhost:5601/goto/40aee5533f53b86058419fc9d4fcd6a8" 
        width="1200"
        height="800"
        title="Example Iframe"
      ></iframe>
    </div>
  );
}

export default Dashboard;