import axios from "axios"

class QuizzesServices {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/quiz`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getAllQuizzes() {
        return this.api.get('/getAllQuizzes')
    }

    createNewQuiz(quizData) {
        return this.api.post('/saveQuiz', quizData)
    }

    getQuizById(id) {
        return this.api.get(`/quizById/${id}`)
    }

}

const quizzesService = new QuizzesServices()

export default quizzesService