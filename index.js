let request = require("request")
let express = require("express")
let bodyparser = require("body-parser")

let app = express()
let http = require("http")

let secrets = require("./secrets")
const BOT_ID = secrets.test_bot_id

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

let server = http.createServer(app).listen(3000, function() {
	console.log("Hello, Kevin Wunderful")
})

app.post("/post", (req, res) => {
	console.log("Message received: ")
	console.log(req.body)

	if(req.body.sender_type !== "bot") {
		if(/[^"]{0,1}can[^\w'"]{1}/gi.test(req.body.text)) {
			request.post(
				{
					url: "https://api.groupme.com/v3/bots/post",
					form: {
						"bot_id": BOT_ID,
						"text": "I don't know, can I?",
					}
				},
				(err, httpResponse, body) => {
					if(err != null) {
						console.log("oh noo")
						console.log(err)
					}
				}
			)
		} else if(req.body.text.contains("can")) {
			request.post(
				{
					url: "https://api.groupme.com/v3/bots/post",
					form: {
						"bot_id": BOT_ID,
						"text": "*" + req.body.text.replace('can', 'may')
					}
				},
				(err, httpResponse, body) => {
					if(err != null) {
						console.log("Error")
						console.log(err)
					}
				}

			)
		}

		if(req.body.text.toLowerCase().contains('dolphin')) {
			request.post(
				{
					url: "https://api.groupme.com/v3/bots/post",
					form: {
						"bot_id": BOT_ID,
						"text": "Dolphins do not exist."
					}
				},
				(err, httpResponse, body) => {
					if(err != null) {
						console.log("Error")
						console.log(err)
					}
				}

			)
		}
	}

	res.end()
})