import React, { useEffect, useState, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NewQuizModal from '../../components/NewQuizModal/NewQuizModal'
import NewQuizzButton from '../../components/NewQuizzButton/NewQuizzButton'
import QuizDetailsModal from '../../components/QuizDetailsModal/QuizDetailsModal'
import QuizList from '../../components/QuizList/QuizList'
import SearchBar from '../../components/SearchBar/SearchBar'
import { AuthContext } from '../../contexts/auth.context'
import quizzesService from '../../services/quizzes.services'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const QuizListPage = () => {

    const [quizzes, setQuizzes] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState('')
    const [ratingValue, setRatingValue] = useState([0, 5])
    const [searchValue, setSearchValue] = useState('')

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadQuizzes()
    }, [])

    useEffect(() => {
        filteredQuizzes()
    }, [searchValue, ratingValue])



    const loadQuizzes = () => {
        quizzesService
            .getAllQuizzes()
            .then(({ data }) => setQuizzes(data))
            .catch(err => console.log(err))
    }

    const handleSearchBar = e => {
        setSearchValue(e.target.value)
    }

    const handleRatingBar = e => {
        setRatingValue(e)
    }
    const filteredQuizzes = () => {
        quizzesService
            .searchQuizzes(searchValue, ratingValue[0], ratingValue[1])
            .then(({ data }) => setQuizzes(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowModal(false)
        loadQuizzes()
    }

    const openModalDetails = (id) => {
        setShowModalDetails(true)
        setSelectedQuiz(id)
    }

    const marks = {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
    }

    return (
        <>
            <Container className='py-4'>
                <h1>Check the quizzes created by the community!</h1>
                <hr />
                <Row className='align-items-center'>
                    <Col md={{ span: 4 }}>
                        <SearchBar handleSearchBar={handleSearchBar} searchValue={searchValue} />
                    </Col>
                    <Col md={{ span: 3, offset: 1 }}>
                        <div>
                            <h4>Filter by rating:</h4>
                            <Slider
                                value={ratingValue}
                                onChange={handleRatingBar}
                                range
                                min={0}
                                max={5}
                                marks={marks}

                            />
                        </div>
                    </Col>
                    {
                        user &&
                        <Col className='d-flex' md={{ span: 2, offset: 2 }} >
                            <NewQuizzButton setShowModal={setShowModal} />
                        </Col>
                    }
                </Row>
                <QuizList quizzes={quizzes} openModalDetails={openModalDetails} fireFinalActions={fireFinalActions} />
            </Container>

            <QuizDetailsModal selectedQuiz={selectedQuiz} showModalDetails={showModalDetails} setShowModalDetails={setShowModalDetails} />

            <NewQuizModal fireFinalActions={fireFinalActions} setShowModal={setShowModal} showModal={showModal} />

        </>
    )
}

export default QuizListPage