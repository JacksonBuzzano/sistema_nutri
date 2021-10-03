//IMPORTAR CONECXÃO
const connect = require('../connection');

async function selectAgenda() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT b.nr_sequencia, a.nm_cliente, b.dt_data, b.nr_hora, b.nm_medico, ' +
        'b.nm_sala, a.nm_telefone FROM jb_cliente a, jb_agenda b WHERE a.nr_sequencia = b.nm_paciente');
    return rows;
}

async function agendaTotal() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT COUNT(*) AS Total FROM jb_agenda');
    return rows[0].Total;
}

async function selectPatientName(nome, medico) {
    const conn = await connect.connect();
    const sql = 'SELECT b.nr_sequencia, a.nm_cliente, b.dt_data, b.nr_hora, b.nm_medico, b.nm_sala, a.nm_telefone ' +
                'FROM jb_cliente a, jb_agenda b where a.nm_cliente LIKE "' + nome + '%" AND b.nm_medico LIKE "' + medico + '%" AND a.nr_sequencia = b.nm_paciente';
    const [rows] = await conn.query(sql);
    return rows;
};

async function pesquisaClient(values) {
    const conn = await connect.connect();
    const sql = 'SELECT a.nr_sequencia, a.nm_cliente, a.dt_nascimento, a.nm_cidade, a.nm_endereco, a.nm_telefone,' +
                'a.nm_email FROM jb_cliente a WHERE a.nm_cliente LIKE "' + values + '%"'; 
    const [rows] = await conn.query(sql);
    return rows;    
}

async function registerAgenda(values) {
    const conn = await connect.connect();
    const sql = 'INSERT INTO jb_agenda (nm_paciente, dt_data, nr_hora, nm_sala, nm_medico, nm_contato, nm_endereco,' +
                'dt_nascimento) VALUES(?,?,?,?,?,?,?,?)';
    const customers = [values.nm_paciente, values.dt_data, values.nr_hora, values.nm_sala, values.nm_medico,
    values.nm_contato, values.nm_endereco, values.dt_nascimento];
    const rows = await conn.query(sql, customers);
    return rows;
}

async function selectAgendaID(values) {
    const conn = await connect.connect();
    const sql = 'SELECT b.nm_cliente, a.nr_sequencia, a.nm_paciente, a.dt_data, a.nr_hora, a.nm_sala, b.nm_telefone,' +
                'a.nm_endereco, a.dt_nascimento, a.nm_medico FROM jb_agenda a, jb_cliente b WHERE a.nr_sequencia = ? AND b.nr_sequencia = a.nm_paciente';
    const [rows] = await conn.query(sql, [values]);
    return rows;
};

async function editAgenda(id, values) {
    const conn = await connect.connect();
    const sql = 'UPDATE jb_agenda SET nm_paciente=?, dt_data=?, nr_hora=?, nm_sala=?, nm_medico=?, nm_contato=?,'+
                'nm_endereco=?, dt_nascimento=? WHERE nr_sequencia=?';
    const customers = [values.nm_paciente, values.dt_data, values.nr_hora, values.nm_sala, values.nm_medico,
        values.nm_contato, values.nm_endereco, values.dt_nascimento, id];
    const rows = await conn.query(sql, customers);
    return rows;
}

async function selectTotalAgendaFilter(nome, medico) {
    const conn = await connect.connect();
    const sql = 'SELECT COUNT(*) AS Total FROM jb_cliente a, jb_agenda b WHERE a.nm_cliente LIKE "' + nome + '%"' +
                'AND b.nm_medico LIKE "' + medico + '%" AND b.nm_paciente = a.nr_sequencia';
    const [rows] = await conn.query(sql);
    return rows[0].Total;
}

async function deleteAgenda(id) {
    const conn = await connect.connect();
    const sql = 'DELETE FROM jb_agenda WHERE nr_sequencia=?';
    const rows = await conn.query(sql, [id]);
    return rows;
}

module.exports = {
    selectAgenda,
    agendaTotal,
    selectPatientName,
    registerAgenda,
    selectAgendaID, 
    editAgenda,
    selectTotalAgendaFilter, 
    pesquisaClient,
    deleteAgenda
}