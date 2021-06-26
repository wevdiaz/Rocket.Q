const Database = require("../db/config");

module.exports = {
    home(req, res) {
        return res.render("index", { page: "enter-room"});
    },

    async index(req, res) {
        const db = await Database();

        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        // Check password
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = '${roomId}'`);

        if (verifyRoom.password == password) {
            if (action == "delete") {
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
            }
            else if (action == "check") {
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
            }
            
            return res.redirect(`/room/${roomId}`);
        }
        else {            
            return res.render("password-incorrect", { roomId });
        }        
        
    },

    async create(req, res) {
        const db = await Database();

        const question = req.body.question;
        const roomId = req.params.room;

        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        ) VALUES ('${question}', '${roomId}', 0 )`);        

        return res.redirect(`/room/${roomId}`);
    }
}