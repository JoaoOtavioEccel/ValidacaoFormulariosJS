class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposValidos();
        const senhasValidas = this.senhasValidas();
        if(camposValidos && senhasValidas) {
            alert('Formulário enviado!');
            this.formulario.submit();
        }
    }

    senhasValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetirSenha');


        if(senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, '*Senhas precisam ser iguais.');
            this.criaErro(repetirSenha, '*Senhas precisam ser iguais.');
        }

        if(senha.value.length < 6 || senha.value.length > 12) {
            this.criaErro(senha, '*Senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }

    camposValidos() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.errorText')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            if(!campo.value) {
                this.criaErro(campo, `*Campo [${label}] não pode estar em branco.`);
                valid = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCpf(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
        
        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let validar = true;
        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, '*Usuário precisa ter entre 3 e 12 caracteres.');
            validar = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, '*Nome de usuário precisa conter apenas letras e/ou números.');
            validar = false;
        }
        return validar;
    }

    validaCpf(campo) {
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.criaErro(campo, '*CPF inválido');
            return false;
        }

        return true;
    }



    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('errorText');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();
