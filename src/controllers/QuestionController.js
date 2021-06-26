

module.exports = {
    home(req, res) {
        return res.render("index", { page: "enter-room"});
    },

    index(req, res) {
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        console.log(`${roomId},`)
        console.log(`${questionId},`)
        console.log(`${action},`)
        console.log(`${password},`)
    },

    create(req, res) {}
}