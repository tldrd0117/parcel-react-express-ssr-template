import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from '../../client/App'
import ReactDOMServer from 'react-dom/server'
import {flushToHTML} from 'styled-jsx/server'

import express, { Request, Response, NextFunction, Errback } from "express"
import cors from "cors"
import { Helmet } from 'react-helmet'
import path from 'path'
import fs from 'fs'
// import bodyParser from 'body-parser';
const clientFilePath = path.resolve(__dirname, "../")

export default ({ app }:{ app : express.Application }) => {
    app.use(cors())
    // app.use(bodyParser.json())
    const filePath = path.resolve(clientFilePath, "client/index.html")
    fs.readFile(filePath, (err, data) => {
        const indexHtml = data.toString()
        const sourceNames = indexHtml.match(/<script\ssrc="(.*?)">/)
        const linkNames = indexHtml.match(/<link.*href="(.*?)">/)
        let sourceName: string = "", linkName:string = ""
        if(sourceNames != null && sourceNames?.length> 0)
            sourceName = sourceNames[1]
        if(linkNames != null && linkNames.length>0)
            linkName = linkNames[1]
        console.log(sourceName, linkName)
        app.get("/client/*", (req, res)=>{
            const filePath = path.resolve(clientFilePath, req.originalUrl.slice(1))
            fs.exists(filePath, (is) => {
                if(is) res.sendFile(filePath)
                else res.send("NOT EXIST FILE");
            })
        })
        app.use((req: Request, res: Response, next: NextFunction) => {
            ReactDOMServer.renderToString(<Helmet>
                <title>hello</title>
                {
                    sourceName?<script src={`/client/${sourceName}`}></script>:null
                }
                {
                    linkName?<link rel="stylesheet" href={`/client/${linkName}`}/>:null
                }
            </Helmet>)
            const helmet = Helmet.renderStatic()
            const app = ReactDOMServer.renderToString(<App name={"world"}/>)
            const styles = flushToHTML()
            const html = `
                <!doctype html>
                <html ${helmet.htmlAttributes.toString()}>
                    <head>
                        ${styles}
                        ${helmet.title.toString()}
                        ${helmet.meta.toString()}
                        ${helmet.link.toString()}
                    </head>
                    <body ${helmet.bodyAttributes.toString()}>
                        <div id="app">
                            ${app}
                        </div>
                        ${helmet.script.toString()}
                    </body>
                </html>
            `;
            res.send(html)
        })
    })
    
}