import React, { useState } from "react";

import { useParams } from "react-router-dom";

function MachineDetails() {
  let { id } = useParams();

  console.log(id);

  return <div>Test 



  </div>;
}

export default MachineDetails;
