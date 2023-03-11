import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import QuizResults from "../../components/QuizResults/QuizResults"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import quizzesService from "../../services/quizzes.services"
import usersService from "../../services/users.services"

const QuizResultPage = () => {

    const { id } = useParams()

    const { user } = useContext(AuthContext)

    const [quiz, setQuiz] = useState('')
    const [currentUser, setCurrentUser] = useState(false)


    useEffect(() => {
        getQuizz()
        getUser()
    }, [])

    const getQuizz = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => setQuiz(data))
            .catch(err => console.log(err))
    }

    const getUser = () => {
        usersService
            .getUserById(user._id)
            .then(({ data }) => setCurrentUser(data))
            .catch(err => console.log(err))
    }

    return (
        <Container className="mt-4">
            {
                currentUser && quiz ?
                    <QuizResults quiz={quiz} user={currentUser} />
                    :
                    <SpinnerLoader />
            }

        </Container>
    )
}

export default QuizResultPage