/*import express from "express"
import routes from "./routes.js"
import cors from "cors";

const app = express()
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    };
app.use(cors(corsOptions));

app.listen(app.get("port"))
app.set("port",3000)
app.use(express.json())
app.use("/", routes)


const main =()=>{
    app.listen(app.get("port"));
    console.log(`port ${app.get("port")}`)
}

main()

//varchar = Character Varying

// CRE */