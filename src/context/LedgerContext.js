import React from "react"

export const LedgerContext = React.createContext({
    contextData: "",
    startDate: "",
    endDate: "",
    dataTransfer: () => {},
    dateTransfer: () => {}
  });