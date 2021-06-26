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

    open(req, res) {
        const roomId = req.params.room;
        
        return res.render("room", { roomId });
    }
}