export class usuario {
    constructor(usuario, senha){
        this.usuario = usuario
        this.senha = senha
    }

    get nomeUsuario(){
        return this.usuario
    }

    set nomeUsuario(nomeUsuario){
        this.usuario = nomeUsuario
    }

    get senhaUsuario(){
        return this.senha
    }

    set senhaUsuario(senhaUsuario){
        this.senha = senhaUsuario
    }
}