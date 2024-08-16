import React from "react";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount";


function Dashboard() {

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <h3 className="text-2xl font-bold mt-5 mb-4">대시보드</h3>
      <iframe   // kibana 실행 필요 
        src="http://192.168.0.135:5602/goto/641263a76ba8e4b114dce6e2842309f8" 
        width="1200"
        height="800"
        title="Kibana Dashboard"
      ></iframe>
    </div>
  );
}

export default Dashboard;