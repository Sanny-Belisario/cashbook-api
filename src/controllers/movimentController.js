const movimentoModel = require('../models/movimentModel');

exports.post=async(data,idUser)=>{
    return await movimentoModel.post(data, idUser);
}

exports.get=async()=>{
    return await movimentoModel.get();   
}

exports.put=async(data, idUser)=>{
    return await movimentoModel.put(data, idUser);
}
exports.delete=async(id)=>{
    return await movimentoModel.remove(id);
}

exports.getCashBalance=async()=>{
    return await movimentoModel.getCashBalance();   
}

exports.getIO=async()=>{
    return await movimentoModel.getIO();
}

exports.getIOAnoMes = async(ano, mes) => {
    return await movimentoModel.getIOAnoMes(ano, mes);
}

exports.getDataInicialFinal = async(anoI, mesI, anoF, mesF) => {
    return await movimentoModel.getDataInicialFinal(anoI, mesI, anoF, mesF);
}

exports.getMovimentsData = async(ano, mes) => {
    return await movimentoModel.getMovimentsData(ano, mes)
}