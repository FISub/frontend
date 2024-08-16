import React from "react";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount";


function Dashboard() {

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <h3 className="text-2xl font-bold mt-5 mb-4">대시보드</h3>
      <iframe   // kibana 실행 필요 
        src="http://192.168.0.135:5602/goto/b3f04872f5c7b0d37e91f9f4ce41759e"
        width="1200"
        height="800"
        title="Kibana Dashboard"
      ></iframe>
    </div>
  );
}

export default Dashboard;