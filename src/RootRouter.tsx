import { Navigate, Route, Routes } from "react-router-dom";
import { BookFlightsForm } from "./BookFlightsForm";

export const RootRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"/bookFlights"} />} />
      <Route path={"/bookFlights"} element={<BookFlightsForm />} />
    </Routes>
  );
};
