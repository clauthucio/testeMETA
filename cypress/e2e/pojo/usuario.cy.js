// Definindo um objeto JavaScript para representar o 'Usuario'
export const usuario = {
    usuario: '',  // Inicialize com uma string vazia ou um valor padrão
    senha: '',   // Inicialize com uma string vazia ou um valor padrão

    setUsuario: function(usuario) {
        this.usuario = usuario;
    },

    getUsuario: function() {
        return this.usuario;
    },

    setSenha: function(senha) {
        this.senha = senha;
    },

    getSenha: function() {
        return this.senha;
    }
};

export default usuario;