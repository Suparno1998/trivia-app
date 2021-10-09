import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Question from './components/question'
import Answer from './components/answer';
import { useState,useEffect} from 'react';
import swal from 'sweetalert'
const API_URL = "https://jservice.io/api/random"
function App() {
  let [question,setQuestion] = useState("");
  let [category,setCategory] = useState("");
  let [answer,setAnswer] = useState("")
  let [input,setInput] = useState("")
  let [score,setScore] = useState(0)
  let [lives,setLives] = useState(5)
  let [highScore,setHighScore] = useState(0)
  async function getQuestion(){
    try{
      let response = await fetch(API_URL,{
        method : "GET"
      })
      if(response.status === 200){
        let data = await response.json()
        let triviaElement = data[0]
        if(triviaElement.question === "")
        {
          swal("Info","This particular question has no question text","info")
        }
        setQuestion(triviaElement.question)
        setCategory(triviaElement.category.title)
        setAnswer(triviaElement.answer)
        setInput("")
      }
      else{
        setQuestion("No data from API")
      }
    }catch(e){
      console.log(e)
      setQuestion("Error")
    }
  }
  const submit = async ()=>{
    if(input === ""){
      swal("Info","Please enter an answer to proceed","warning")
      return
    }
    if(answer === input){
      swal("Yayy !!","Your answer is correct","success")
      setScore(score+1)
    }
    else{
      swal("Oops !!","Your answer is incorrect","error")
      setLives(lives-1)
    }
    setInput("")
    getQuestion()
  }
  const reset : any = ()=>{
    setLives(5)
    setScore(0)
  }
  function getAnswerFromInput(value : string){
    setInput(value)
  }
  useEffect(()=>{
    document.title = "Suparno's Trivia App"
    getQuestion()
  },[])
  if(question === ""){
    return (<Container>
      <Row className="d-flex justify-content-center">
          <Col className="col-auto">
            <h1 className="display-3">Trivia App</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10}md={8} lg={6}>
            <h1>Loading Question......</h1>
          </Col>
        </Row>
    </Container>)
  }
  else if(question === "Error")
    return (<Container>
      <Row className="d-flex justify-content-center">
          <Col className="col-auto">
            <h1 className="display-3">Trivia App</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10}md={8} lg={6}>
            <h1>Some kind of error has occured, please refresh the page and try again</h1>
          </Col>
        </Row>
    </Container>)
  else if(question === "No data from API"){
    return (<Container>
      <Row className="d-flex justify-content-center">
          <Col className="col-auto">
            <h1 className="display-3">Trivia App</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10}md={8} lg={6}>
            <h1>No data received from API, please refresh the page and try again</h1>
          </Col>
        </Row>
    </Container>)
  }
  else {
    if(lives > 0){
      return (
        <Container className="p-3 full">
          <Row className="d-flex justify-content-center">
            <Col className="col-auto">
              <h1 className="display-3">Trivia App</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10}md={10} lg={10} className="p-0">
              <Question question = {question} category={category}></Question>
            </Col>
          </Row>
          <Row className="my-1">
            <Col xs={12} sm={10}md={8} lg={6}>
              <Row>
                <Answer answer={getAnswerFromInput} val={input}></Answer>
              </Row>
              <Row className="d-flex justify-content-end my-1">
                <Col xs={3} className="d-flex justify-content-end p-0">
                  <Button variant="outline-primary" type="submit" onClick={submit}>Submit</Button>{' '}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10}md={8} lg={6}>
              <Row className="d-flex justify-content-start my-1 scoreboard bg-light">
                <Col className="score" xs={4} sm={2}md={2} lg={2}>Score : {score}</Col>
                <Col className="life" xs={4} sm={2}md={2} lg={2}>Lives : {lives}</Col>
                {highScore > 0 ? <Col className="score" xs={4} sm={3}md={3} lg={3}>High score : {highScore}</Col> : <></>}
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
    if(lives === 0){
      if(score > highScore)
        setHighScore(score)
      return(
        <Container className="p-3 full">
          <Row className="d-flex justify-content-center">
            <Col className="col-auto">
              <h1 className="display-3">Trivia App</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10}md={10} lg={10} className="p-0 display-5">
              Your score was {score}. Refresh the browser to try again
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10}md={10} lg={10} className="p-0 display-5">
            <Button variant="outline-primary" type="submit" onClick={reset}>Reset</Button>{' '}
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default App;
