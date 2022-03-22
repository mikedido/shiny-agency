import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../utils/Loader';
import Styled from 'styled-components';
import colors from '../utils/style/colors';
import { useFetch } from '../utils/hooks';
import { SurveyContext } from '../utils/context';
import { useContext } from 'react'

const SurveyContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const QuestionTitle = Styled.h2`
    text-decoration: underline;
    text-decoration-color: ${colors.primary};
`;

const QuestionContent = Styled.span`
  margin: 30px;
`;

const LinkWrapper = Styled.div`
    padding-top: 30px;
    & a {
    color: black;
    }
    & a:first-of-type {
    margin-right: 20px;
    }
`;

const ReplyBox = Styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`;

const ReplyWrapper = Styled.div`
  display: flex;
  flex-direction: row;
`;

function Survey() {

    const { questionNumber } = useParams();
    const questionNumberInt = parseInt(questionNumber);
    const prevQuestionNumber = (questionNumberInt - 1 > 0) ? questionNumberInt - 1 : 1;
    const nextQuestionNumber = questionNumberInt + 1;
    //const [surveyData, setSurveyData] = useState({});
    //const [isDataLoading, setDataLoading] = useState(true);
    //const [error, setError] = useState(false);

    //call API to get data
    //solution 1 promise
    // useEffect(() => {

    //     fetch(`http://localhost:8000/survey`)
    //         .then((response) => response.json()
    //         .then(( { surveyData } ) =>  { 
    //             setSurveyData(surveyData) 
    //             setDataLoading(false);
    //         })
    //         .catch((error) => console.error(error))
    //         )
    // }, [])

    //solution 2 await/async
    // useEffect(() => {
    //     setDataLoading(true);

    //     async function getSurvey() {
    //         const response = await fetch(`http://localhost:8000/survey`);
    //         try {
    //             const { surveyData } = await response.json();
    //             setSurveyData(surveyData);
    //         } catch(error) {
    //             console.log(error);
    //             setError(error);
    //         } finally {
    //             setDataLoading(false);
    //         }
    //     }
    //     getSurvey();
    // }, []);

    //Solution 3 using a specific hook useFetch
    const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`);
    const { surveyData } = data;

    const { answers, saveAnswers } = useContext(SurveyContext);

    function saveReply(answer) {
        saveAnswers({ [questionNumber]: answer })
    }

    if (error) {
        return <span>Il y a une erreur</span>
    }

    return (
        <SurveyContainer>
            <h1>Questionnaires</h1>
            <QuestionTitle>Question {questionNumber}</QuestionTitle>
                {(isLoading ?
                (<Loader /> ): 
                (<QuestionContent>{surveyData[questionNumber]}</QuestionContent>)
                ) }
                <ReplyWrapper>
                    <ReplyBox
                    onClick={() => saveReply(true)}
                    isSelected={answers[questionNumber] === true}
                    >
                    Oui
                    </ReplyBox>
                    <ReplyBox
                    onClick={() => saveReply(false)}
                    isSelected={answers[questionNumber] === false}
                    >
                    Non
                    </ReplyBox>
                </ReplyWrapper>
            <LinkWrapper>
                <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
                {surveyData && surveyData[nextQuestionNumber] ? 
                    (<Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>) : 
                    (<Link to="/results">Résultats</Link>)    
                }
            </LinkWrapper>
        </SurveyContainer>
    )
}

export default Survey;