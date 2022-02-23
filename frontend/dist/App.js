var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import axios from 'axios';
import React, { useRef, useState } from 'react';
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
function App() {
    // Tamanho do tabuleiro
    var fieldSizeX = 5;
    var fieldSizeY = 5;
    // Estado inicial do tabuleiro
    var _a = __read(useState(0), 2), currentX = _a[0], setCurrentX = _a[1];
    var _b = __read(useState(0), 2), currentY = _b[0], setCurrentY = _b[1];
    var _c = __read(useState('N'), 2), currentDirection = _c[0], setCurrentDirection = _c[1];
    // Generate random UUID
    var _d = __read(useState(generateUniqueID()), 2), uuid = _d[0], setUuid = _d[1];
    var _e = __read(useState(null), 2), errorMessage = _e[0], setErrorMessage = _e[1];
    var CommandInputRef = useRef(null);
    function handleSubmit() {
        var _a;
        axios.post('http://localhost:3333/api/v1/drive', {
            command: (_a = CommandInputRef === null || CommandInputRef === void 0 ? void 0 : CommandInputRef.current) === null || _a === void 0 ? void 0 : _a.value,
            currentX: currentX,
            currentY: currentY,
            currentDirection: currentDirection
        }, { headers: { uuid: uuid } }).then(function (res) {
            if (res.status === 200) {
                setCurrentDirection(res.data.currentDirection);
                setCurrentX(res.data.currentX);
                setCurrentY(res.data.currentY);
            }
        }).catch(function (err) {
            setErrorMessage(err.response.data.message);
        });
        if (CommandInputRef === null || CommandInputRef === void 0 ? void 0 : CommandInputRef.current) {
            CommandInputRef.current.value = '';
        }
    }
    function handleReset() {
        setCurrentDirection('N');
        setCurrentX(0);
        setCurrentY(0);
    }
    return (React.createElement("div", { className: "App" },
        React.createElement(Container, null,
            React.createElement(Row, { as: "h1", className: "justify-content-center p-4" }, "Rob\u00F4 Marciano"),
            React.createElement(Row, { className: 'd-flex align-items-center' },
                React.createElement(Col, { sm: 12, lg: 4 },
                    React.createElement(Row, null,
                        React.createElement(Col, { sm: 8 },
                            React.createElement(OverlayTrigger, { trigger: "click", key: "bottom", placement: "bottom", overlay: React.createElement(Popover, { id: "popover-positioned-bottom" },
                                    React.createElement(Popover.Header, { as: "h3" }, "Comandos dispon\u00EDveis:"),
                                    React.createElement(Popover.Body, null,
                                        React.createElement("strong", null, "m: "),
                                        "Avan\u00E7ar uma unidade.",
                                        React.createElement("br", null),
                                        React.createElement("strong", null, "r: "),
                                        "Girar 90\u00B0 no sentido hor\u00E1rio.",
                                        React.createElement("br", null),
                                        React.createElement("strong", null, "l: "),
                                        "Girar 90\u00B0 no sentido anti-hor\u00E1rio.",
                                        React.createElement("br", null),
                                        React.createElement("br", null),
                                        "Exemplo: ",
                                        React.createElement("strong", null, "mmrml"))) },
                                React.createElement(Form.Control, { placeholder: "Comando", type: "text", ref: CommandInputRef }))),
                        React.createElement(Col, { sm: 4 },
                            React.createElement(Button, { onClick: function () { return handleSubmit(); } }, "Submeter")))),
                React.createElement(Col, { sm: 12, lg: 8 },
                    React.createElement(Tabuleiro, { fieldSizeX: fieldSizeX, fieldSizeY: fieldSizeY, currentX: currentX, currentY: currentY, currentDirection: currentDirection }))),
            React.createElement(Row, null,
                React.createElement(Col, { sm: 12, lg: 4 }),
                React.createElement(Col, { sm: 12, lg: 8 },
                    React.createElement(Button, { onClick: function () { return handleReset(); } }, "Resetar"))),
            React.createElement(ToastContainer, { position: "bottom-end", className: "p-3", style: { minHeight: "100vh", } }, errorMessage ? React.createElement(Toast, { onClose: function () { return setErrorMessage(null); }, show: errorMessage, delay: 3000, autohide: true },
                React.createElement(Toast.Header, null,
                    React.createElement("strong", { className: "me-auto" }, "Erro!")),
                React.createElement(Toast.Body, null, errorMessage))
                : React.createElement(React.Fragment, null)))));
}
export default App;
