import express from "express"
import routes from "./routes.js"

const app = express()
app.listen(app.get("port"))
app.set("port",3000)
app.use(express.json())
app.use("/", routes)


const main =()=>{
    app.listen(app.get("port"));
    console.log(`port ${app.get("port")}`)
}

main()
