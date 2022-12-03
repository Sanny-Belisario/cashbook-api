const mysql = require("./mysqlConnect");

get= async (query)=>{
    sql=" SELECT * FROM moviment"
    return await mysql.query(sql);
}

getCashBalance= async (query)=>{
    sqlInput = "SELECT SUM(value) as input FROM moviment WHERE type = 'input'";
    input = await mysql.query(sqlInput);
    sqlOutput = "SELECT SUM(value) as output FROM moviment WHERE type = 'output'"
    output = await mysql.query(sqlOutput);
    //console.log(input[0]['input'])
    return input[0]['input'] - output[0]['output'];
}

post= async (date, idUser)=>{
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviment SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov)=>{
    sql="DELETE FROM moviment"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 getIO = async (query) => {
    sql = "SELECT value, date, type FROM moviment GROUP BY type, date";
    return await mysql.query(sql);
 }

 getIOAnoMes = async (ano, mes) => {
    sql = "SELECT value, date, type FROM moviment WHERE date like '" + ano + "-" + mes + "%' GROUP BY type, date"
    return await mysql.query(sql);
 }

 getDataInicialFinal = async (anoI, mesI, anoF, mesF) => {
    sql = "SELECT value, date, type FROM moviment WHERE date > '"+ anoI + "-" + mesI + "-00' and date < '" + anoF + "-" + mesF + "-31' GROUP BY date, type"
    return await mysql.query(sql);
 }

 getMovimentsData = async (ano, mes) => {
    sql = "SELECT * FROM moviment WHERE date > '" + ano + "-" + mes + "-00' and date < '" + ano + "-" + mes + "-31'"
    return await mysql.query(sql)
 }
module.exports= {get,post, put, remove, getCashBalance, getIO, getIOAnoMes, getDataInicialFinal, getMovimentsData}