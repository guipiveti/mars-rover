// const db_connection = require('../database/connection');
const db = require("../../services/db.js");

module.exports = {
    async move(request, response) {
        const { currentX: initialX, currentY: initialY, currentDirection: initialDirection } = request.body;
        let { command } = request.body;
        const { uuid } = request.headers;
        command = command.toString().toUpperCase();

        let currentX = initialX;
        let currentY = initialY;
        let currentDirection = initialDirection;

        let error_code = null;

        function rotateRobot(rotateRight) {
            if (rotateRight) {
                currentDirection++;
            }
            else {
                currentDirection--;
            }

            if (currentDirection < 0) {
                currentDirection = 3;
            } else if (currentDirection > 3) {
                currentDirection = 0;
            }
        }

        for (var i = 0; i < command.length; i++) {
            switch (command.charAt(i)) {
                case 'M':
                    switch (currentDirection) {
                        case 0:
                            if (currentY !== 4) {
                                currentY++;
                            } else {
                                error_code = 'border'
                                break;
                            }
                            break;
                        case 1:
                            if (currentX !== 4) {
                                currentX++;
                            } else {
                                error_code = 'border'
                                break;
                            }
                            break;
                        case 2:
                            if (currentY !== 0) {
                                currentY--;
                            } else {
                                error_code = 'border'
                                break;
                            }
                            break;
                        case 3:
                            if (currentX !== 0) {
                                currentX--;
                            } else {
                                error_code = 'border'
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
                    error_code = 'command'
                    break;
            }
            if(error_code){break;}
        }

        /* data = await db.raw(`
            INSERT INTO commands_log
            (user_id, original_x, original_y, original_direction, command, "timestamp", "valid", new_x, new_y, new_direction)
            VALUES('${uuid}', ${initialX}, ${initialY}, ${initialDirection}, '${command}', null , ${error_code?false:true}, ${currentX}, ${currentY}, ${currentDirection});`); */

        if (!error_code) {
            await db.raw(`
                INSERT INTO commands_log
                (user_id, original_x, original_y, original_direction, command, "timestamp", "valid", new_x, new_y, new_direction)
                VALUES(:uuid, :initialX, :initialY, :initialDirection, :command, :now , :valid, :currentX, :currentY, :currentDirection);`,
                {now: new Date().toISOString(), uuid, initialX, initialY, initialDirection, command, valid: true,  currentX, currentY, currentDirection,});

            return response.json({ command, currentDirection, currentX, currentY });
        } else {
            let message = "";
            switch (error_code) {
                case 'border':
                    message = "Comando faria o robô atingir a borda."
                    break;
                case 'command':
                    message = "Comando inválido."
                    break;
                default:
                    message = "Erro desconhecido."
                    break;
            }

            await db.raw(`
            INSERT INTO commands_log
            (user_id, original_x, original_y, original_direction, command, "timestamp", "valid", new_x, new_y, new_direction)
            VALUES(:uuid, :initialX, :initialY, :initialDirection, :command, :now , :valid, :currentX, :currentY, :currentDirection);`,
            {now: new Date().toISOString(), uuid, initialX, initialY, initialDirection, command, valid: false,  currentX: initialX, currentY: initialY, currentDirection: initialDirection,});

            return response.status(400).json({ message });
        }
    }
}