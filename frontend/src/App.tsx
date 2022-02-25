import React, {useState, useRef} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './App.css';
import Tabuleiro from './components/Tabuleiro';
import { generateUniqueID } from './utils';

function App(): JSX.Element {
  // Tamanho do tabuleiro
  const fieldSizeX = 5;
  const fieldSizeY = 5;

  // Estado inicial do tabuleiro
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [currentDirection, setCurrentDirection] = useState('N');

  // Generate random UUID
  const [uuid, setUuid] = useState(generateUniqueID());
  const [errorMessage, setErrorMessage] = useState(null);

  const CommandInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    axios.post('http://localhost:3333/api/v1/drive',
      {
        command: CommandInputRef?.current?.value,
        currentX, currentY, currentDirection
      },
      { headers: { uuid } }
    ).then((res: any) => {
      if (res.status === 200) {
        setCurrentDirection(res.data.currentDirection);
        setCurrentX(res.data.currentX);
        setCurrentY(res.data.currentY);
      }
    }).catch((err: any) => {
      setErrorMessage(err.response.data.message);
    });
    if (CommandInputRef?.current) {
      CommandInputRef.current.value = '';
    }
  }
  function handleReset() {
    setCurrentDirection('N');
    setCurrentX(0);
    setCurrentY(0);
  }

  return (
    <div className="App">
      <Container>
        <Row as="h1" className="justify-content-center p-4">Robô Marciano</Row>
        <Row className='d-flex align-items-center'>
          <Col sm={12} lg={4}>
            <Row>
              <Col sm={8}>
                <OverlayTrigger
                  trigger="click"
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Header as="h3">Comandos disponíveis:</Popover.Header>
                      <Popover.Body>
                        <strong>m: </strong>Avançar uma unidade.<br/>
                        <strong>r: </strong>Girar 90° no sentido horário.<br/>
                        <strong>l: </strong>Girar 90° no sentido anti-horário.<br/><br/>
                        Exemplo: <strong>mmrml</strong>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Form.Control placeholder="Comando" type="text" ref={CommandInputRef} />
                  </OverlayTrigger>
              </Col>
              <Col sm={4}>
                <Button onClick={() => handleSubmit()}>Submeter</Button>
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={8}>
            <Tabuleiro
              fieldSizeX={fieldSizeX}
              fieldSizeY={fieldSizeY}
              currentX={currentX}
              currentY={currentY}
              currentDirection={currentDirection}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={4}></Col>
          <Col sm={12} lg={8}><Button onClick={() => handleReset()}>Resetar</Button></Col>
        </Row>
        <ToastContainer position="bottom-end" className="p-3" style={{ minHeight: "100vh", }}>
          {errorMessage ? <Toast onClose={() => setErrorMessage(null)} show={errorMessage} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Erro!</strong>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
            : <></>}
        </ToastContainer>
      </Container >
    </div >
  );
}

export default App;