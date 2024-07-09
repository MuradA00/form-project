import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./constants"
import { MainScreen } from "./pages/MainScreen"

export const App = () => {
  return (
    <Routes>
      <Route element={<MainScreen />} path={ROUTES.MAIN} />
    </Routes>
  )
}