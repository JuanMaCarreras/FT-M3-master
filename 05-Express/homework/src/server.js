// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let newId = 1

let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body

    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    const newPost = {
        id: newId,
        author,
        title,
        contents,
    }
    posts.push(newPost)
    newId++
    res.json(newPost)
})

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body
    const { author } = req.params

    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    const newPost = {
        id: newId,
        author,
        title,
        contents
    }
    posts.push(newPost)
    newId++
    res.json(newPost)
})


server.get('/posts', (req, res) => {
    const { term } = req.query

    if (term) {
        const filter = posts.filter(p => p.title.includes(req.query.term) || p.contents.includes(req.query.term))
        return res.json(filter)
    }
    res.json(posts)
})


server.get('/posts/:author', (req, res) => {
    const { author } = req.params

    const match = posts.filter(p => p.author === author)

    if (match.length === 0) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" })
    }

    res.json(match)

})

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;

    const filtrados = posts.filter(p => p.author === author && p.title === title)

    if (filtrados.length === 0) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" })
    }
    res.json(filtrados)

})

server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body;

    if (!id || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }

    const post = posts.find(p => p.id === id)

    if (!post) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se encontró el Post" })
    }
    post.title = title
    post.contents = contents

    res.json(post)
})


server.delete('/posts', (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(STATUS_USER_ERROR).json({ error: " No hay Id crack " })
    }

    const post = posts.find(p => p.id === id)

    if (!post) {
        return res.status(STATUS_USER_ERROR).json({ error: " No hay post crack " })
    }

    posts = posts.filter(p => p.id !== id)
    res.json({ success: true })

})

server.delete('/author', (req, res) => {
    const { author } = req.body

    if (!author) {
        return res.status(STATUS_USER_ERROR), json({ error: 'No hay author' })
    }

    const post = posts.filter(p => p.author === author)

    if (post.length === 0) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado" })
    }

    posts = posts.filter(P => P.author !== author)

    res.json(post)
})





// TODO: your code to handle requests

module.exports = { posts, server };
