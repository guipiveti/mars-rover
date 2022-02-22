"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../../services/db.js");
var Directions = {
    N: 0,
    E: 1,
    S: 2,
    W: 3
};
module.exports = {
    move: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            function rotateRobot(rotateRight) {
                if (rotateRight) {
                    currentDirection++;
                }
                else {
                    currentDirection--;
                }
                if (currentDirection < 0) {
                    currentDirection = 3;
                }
                else if (currentDirection > 3) {
                    currentDirection = 0;
                }
            }
            var _a, initialX, initialY, _b, command, initialDirection, uuid, currentX, currentY, currentDirection, error_code, i, _i, _c, key, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = request.body, initialX = _a.currentX, initialY = _a.currentY;
                        _b = request.body, command = _b.command, initialDirection = _b.currentDirection;
                        uuid = request.headers.uuid;
                        command = command.toString().toUpperCase();
                        initialDirection = initialDirection.toString().toUpperCase();
                        currentX = initialX;
                        currentY = initialY;
                        currentDirection = Directions[initialDirection];
                        error_code = null;
                        for (i = 0; i < command.length; i++) {
                            switch (command.charAt(i)) {
                                case 'M':
                                    switch (currentDirection) {
                                        case 0:
                                            if (currentY !== 4) {
                                                currentY++;
                                            }
                                            else {
                                                error_code = 'border';
                                                break;
                                            }
                                            break;
                                        case 1:
                                            if (currentX !== 4) {
                                                currentX++;
                                            }
                                            else {
                                                error_code = 'border';
                                                break;
                                            }
                                            break;
                                        case 2:
                                            if (currentY !== 0) {
                                                currentY--;
                                            }
                                            else {
                                                error_code = 'border';
                                                break;
                                            }
                                            break;
                                        case 3:
                                            if (currentX !== 0) {
                                                currentX--;
                                            }
                                            else {
                                                error_code = 'border';
                                                break;
                                            }
                                            break;
                                    }
                                    break;
                                case 'R':
                                    rotateRobot(true);
                                    break;
                                case 'L':
                                    rotateRobot(false);
                                    break;
                                default:
                                    error_code = 'command';
                                    break;
                            }
                            if (error_code) {
                                break;
                            }
                        }
                        if (!!error_code) return [3 /*break*/, 2];
                        for (_i = 0, _c = Object.keys(Directions); _i < _c.length; _i++) {
                            key = _c[_i];
                            if (Directions[key] === currentDirection) {
                                currentDirection = key;
                                break;
                            }
                        }
                        return [4 /*yield*/, db.raw("\n                INSERT INTO commands_log\n                (user_id, original_x, original_y, original_direction, command, \"timestamp\", \"valid\", new_x, new_y, new_direction)\n                VALUES(:uuid, :initialX, :initialY, :initialDirection, :command, :now , :valid, :currentX, :currentY, :currentDirection);", { now: new Date().toISOString(), uuid: uuid, initialX: initialX, initialY: initialY, initialDirection: initialDirection, command: command, valid: true, currentX: currentX, currentY: currentY, currentDirection: currentDirection })];
                    case 1:
                        _d.sent();
                        return [2 /*return*/, response.json({ command: command, currentDirection: currentDirection, currentX: currentX, currentY: currentY })];
                    case 2:
                        message = "";
                        switch (error_code) {
                            case 'border':
                                message = "Comando faria o robô atingir a borda.";
                                break;
                            case 'command':
                                message = "Comando inválido.";
                                break;
                            default:
                                message = "Erro desconhecido.";
                                break;
                        }
                        return [4 /*yield*/, db.raw("\n            INSERT INTO commands_log\n            (user_id, original_x, original_y, original_direction, command, \"timestamp\", \"valid\", new_x, new_y, new_direction)\n            VALUES(:uuid, :initialX, :initialY, :initialDirection, :command, :now , :valid, :currentX, :currentY, :currentDirection);", { now: new Date().toISOString(), uuid: uuid, initialX: initialX, initialY: initialY, initialDirection: initialDirection, command: command, valid: false, currentX: initialX, currentY: initialY, currentDirection: initialDirection, })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, response.status(400).json({ message: message })];
                }
            });
        });
    }
};
