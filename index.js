const express = require('express')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const getDiretores = (request, response) => {
    pool.query("select * from diretores order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar as diretores: ' + error});
        }
        response.status(200).json(results.rows)
    })
}


const addDiretor = (request, response) => {
    const { nome } = request.body

    pool.query(
        'insert into diretores (nome) values ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir os diretores: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Diretor criado.' })
        }        
    )
}


const updateDiretor = (request, response) => {
    const { codigo, nome} = request.body

    pool.query(
        'update diretores set nome = $1 where codigo = $2',
        [nome, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o diretor: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Diretor atualizado.' })
        }        
    )
}

const deleteDiretor = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from diretores where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o diretor: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Diretor removida.' })
        }        
    )
}

const getDiretorPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from diretores where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar a diretor: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

app
    .route('/diretores')
    .get(getDiretores)
    .post(addDiretor)
    .put(updateDiretor)

app
    .route('/diretores/:codigo')
    .get(getDiretorPorCodigo)
    .delete(deleteDiretor)

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})

const getFilmes = (request, response) => {
    pool.query("select * from filmes order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os filmes: ' + error});
        }
        response.status(200).json(results.rows)
    })
}


const addFilme = (request, response) => {
    const { nome, data_lancamento,diretor} = request.body

    pool.query(
        'insert into filmes (nome,data_lancamento,diretor) values ($1,$2,$3)',
        [nome,data_lancamento,diretor],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o filme: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Filme criado.' })
        }        
    )
}


const updateFilme = (request, response) => {
    const { codigo, nome} = request.body

    pool.query(
        'update filmes set nome = $1 where codigo = $2',
        [nome, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o filme: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Filme atualizado.' })
        }        
    )
}

const deleteFilme = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from filmes where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o filme: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Filme removida.' })
        }        
    )
}

const getFilmePorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from filmes where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o filme: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

app
    .route('/filmes')
    .get(getFilmes)
    .post(addFilme)
    .put(updateFilme)

app
    .route('/filmes/:codigo')
    .get(getFilmePorCodigo)
    .delete(deleteFilme)


