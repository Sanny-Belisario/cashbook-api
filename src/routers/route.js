const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const movimentoController = require("../controllers/movimentController");

router.get('/', (req, res, next) => {
    res.status(200).send({ 'API': 'OK' });
})

router.get("/user", async (req, res, next) => {
    user = await userController.get();
    res.status(200).send(user);
})

router.post('/user/login', async (req, res, next) => {
    user = await userController.login(req.body);
    res.status(200).send(user);
});

router.post('/user/logout', async (req, res, next) => {
    user = await userController.logout(req.headers['x-access-token']);
    res.status(200).send(user);
});

router.get('/moviments', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            resp = await movimentoController.get();
            resp = Object.assign({}, resp, auth);
        } else {
            resp = { "status": "null", auth }
        }
    } else {
        resp = { "status": "null", auth }
    }
    res.status(200).send(resp)
})

router.get('/moviments/cashbalance', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            resp = await movimentoController.getCashBalance();
            console.log(resp.toFixed(2));
            resp = { "cashbalance": parseFloat(resp.toFixed(2)), auth }
        } else {
            resp = { "status": "null", auth }
        }
    } else {
        resp = { "status": "null", auth }
    }
    res.status(200).send(resp)
})

router.post('/mov', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            resp = await movimentoController.post(req.body, req.headers.iduser);
            resp = Object.assign({}, resp, auth);
        } else {
            resp = { "status": "null", auth }
        }
    } else {
        resp = { "status": "null", auth }
    }
    res.status(200).send(resp)
})

router.put('/mov', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            movimento = await movimentoController.put(req.body, req.headers.iduser);
            if (movimento) {
                resp = { "status": "200" }
            } else {
                resp = { "status": "null" }
            }
        } else {
            resp = { "status": "null", auth }
        }
    } else {
        resp = { "status": "null", auth }
    }
    res.status(200).send(resp)
})

router.delete('/movimento', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            movimento = await movimentoController.delete(req.body.id);
            if (movimento) {
                resp = { "status": "200" }
            } else {
                resp = { "status": "null" }
            }
        } else {
            resp = { "status": "null", auth }
        }
    } else {
        resp = { "status": "null", auth }
    }
    res.status(200).send(resp)
})

router.get('/moviments/io', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            movimento = await movimentoController.getIO();
            movimento = Object.assign({}, movimento, auth);
        } else {
            movimento = { "status": "null", auth }
        }
    } else {
        movimento = { "status": "null", auth }
    }
    res.status(200).send(movimento)
})

router.get('/moviments/io/:ano/:mes', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    ano = req.params.ano
    mes = req.params.mes
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            movimento = await movimentoController.getIOAnoMes(ano, mes);
            movimento = Object.assign({}, movimento, auth);
        } else {
            movimento = { "status": "null", auth }
        }
    } else {
        movimento = { "status": "null", auth }
    }
    res.status(200).send(movimento)
})

router.get('/moviments/io/:anoI/:mesI/:anoF/:mesF', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    anoI = req.params.anoI
    mesI = req.params.mesI
    anoF = req.params.anoF
    mesF = req.params.mesF
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            movimento = await movimentoController.getDataInicialFinal(anoI, mesI, anoF, mesF);
            movimento = Object.assign({}, movimento, auth);
        } else {
            movimento = { "status": "null", auth }
        }
    } else {
        movimento = { "status": "null", auth }
    }
    res.status(200).send(movimento)
})

router.get('/moviments/:ano/:mes', async (req, res, next) => {
    auth = userController.verifyJWT(req.headers['x-access-token'])
    ano = req.params.ano
    mes = req.params.mes
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            movimento = await movimentoController.getMovimentsData(ano, mes);
            movimento = Object.assign({}, movimento, auth);
        } else {
            movimento = { "status": "null", auth }
        }
    } else {
        movimento = { "status": "null", auth }
    }
    res.status(200).send(movimento)
})

module.exports = router;