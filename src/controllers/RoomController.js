const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const password = req.body.password;
        let roomId = "";
        let isRoom = true;

        while (isRoom) {
            // create ID
            for (let i = 0; i < 6; i++) {
                roomId += Math.floor(Math.random() * 10).toString();
            }

            // Check if ID Exist
            const roomsExistIds = await db.all(`SELECT * FROM rooms WHERE id = '${roomId}'`);
            isRoom = roomsExistIds.some( roomExistId => roomExistId === roomId );

            if (!isRoom) {
                await db.run(`INSERT INTO rooms (
                    id,
                    password
                ) VALUES (
                    ${parseInt(roomId)},
                    '${password}'
                )`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    },

    async open(req, res) {
        const db = await Database();
        const roomId = req.params.room;
        let isNoQuestions;

        const questions = await db.all(`SELECT * FROM questions WHERE room = '${roomId}' and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = '${roomId}' and read = 1`);

        if (questions.length == 0) {
            if(questionsRead.length == 0) {
                isNoQuestions = true;
            }
        }
                
        return res.render("room", { roomId, questions, questionsRead, isNoQuestions });
    },

    async enterRoom(req, res) {
        const roomId = req.body.roomId;       

        return res.redirect(`/room/${roomId}`);
    }
}