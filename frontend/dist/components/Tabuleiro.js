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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Table from 'react-bootstrap/Table';
function Tabuleiro(props) {
    var RowTabuleiro = function (y) {
        return (React.createElement("tr", { key: y }, __spreadArray([], __read(Array(props === null || props === void 0 ? void 0 : props.fieldSizeX).keys()), false).map(function (x) {
            if (y === props.currentY && x === props.currentX) {
                switch (props === null || props === void 0 ? void 0 : props.currentDirection) {
                    case 'N':
                        return React.createElement("td", { key: x },
                            React.createElement(AiOutlineArrowUp, null));
                    case 'E':
                        return React.createElement("td", { key: x },
                            React.createElement(AiOutlineArrowRight, null));
                    case 'S':
                        return React.createElement("td", { key: x },
                            React.createElement(AiOutlineArrowDown, null));
                    case 'W':
                        return React.createElement("td", { key: x },
                            React.createElement(AiOutlineArrowLeft, null));
                    default:
                        return React.createElement("td", { key: x }, "X");
                }
            }
            else {
                return React.createElement("td", { key: x }, "\u00A0");
            }
        })));
    };
    return (React.createElement(Table, { striped: true, bordered: true },
        React.createElement("tbody", null, __spreadArray([], __read(Array(props === null || props === void 0 ? void 0 : props.fieldSizeY).keys()), false).reverse().map(function (y) { return RowTabuleiro(y); }))));
}
export default Tabuleiro;
