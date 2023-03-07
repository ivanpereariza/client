import { Route, Routes } from "react-router-dom"
import CreateQuizPage from "../pages/CreateQuizPage/CreateQuizPage"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import QuizListPage from "../pages/QuizListPage/QuizListPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import PrivateOwnerOrAdminRoutes from "./PrivateOwnerOrAdmin"
import PrivateUserRoutes from "./PrivateUserRoutes"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/quizzes" element={<QuizListPage />}></Route>

            <Route element={<PrivateUserRoutes />}>
                <Route path="/profile/:id" element={<ProfilePage />}></Route>
                <Route path="/quizzes/create" element={<CreateQuizPage />}></Route>
            </Route>

            <Route element={<PrivateOwnerOrAdminRoutes />}>
                <Route path="/profile/edit/:id" element={<EditUserPage />}></Route>
            </Route>

            <Route path="*" element={<p>404</p>}></Route>
        </Routes>
    )
}
export default AppRoutes