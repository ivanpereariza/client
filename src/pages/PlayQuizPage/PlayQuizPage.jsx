import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import PlayQuiz from "../../components/PlayQuiz/PlayQuiz"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import quizzesService from "../../services/quizzes.services"
import shuffleArray from "../../utils/shuffleArray"

const PlayQuizPage = () => {

    const { id } = useParams()

    const [quiz, setQuiz] = useState([])
    const [quizLoader, setQuizLoader] = useState(true)

    useEffect(() => {
        getQuizById()
    }, [])

    const shuffleAnswers = (data) => {
        setQuiz({
            ...data, questionsArr: data?.questionsArr?.map(question => {
                return question = { ...question, allAnswers: shuffleArray([...question.answersOptions, question.correctAnswer]) }
            })
        })
    }

    const getQuizById = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => {
                shuffleAnswers(data)
                setQuizLoader(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="py-4">

            {
                quizLoader ?
                    <SpinnerLoader />
                    :

                    <PlayQuiz quiz={quiz} />

            }

        </Container>
    )
}

export default PlayQuizPage