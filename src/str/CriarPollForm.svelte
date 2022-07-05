<script>
    import PollStore from '../../scripts/PollStore.js';
    import { createEventDispatcher } from 'svelte';
    import Button from './components/Button.svelte';
    let dispatch = createEventDispatcher();

    let fields = { questao: '', escolhaA: '', escolhaB: '' };
    let erros = { questao: '', escolhaA: '', escolhaB: '' };
    let valido = false;

    function gerarID() {
        let id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return id;
    }


    function criarVotacao() {
        valido = true;
        
        // validar questão
        if (fields.questao.trim().length < 5) {
            valido = false;
            erros.questao = 'A questão deve ter pelo menos 5 caracteres.';
        } else {
            erros.questao = '';
        }

        // validar escolha A
        if (fields.escolhaA.trim().length < 1) {
            valido = false;
            erros.escolhaA = 'A primeira resposta não pode estar vazia.';
        } else {
            erros.escolhaA = '';
        }

        // validar escolha B
        if (fields.escolhaB.trim().length < 1) {
            valido = false;
            erros.escolhaB = 'A segunda resposta não pode estar vazia.';
        } else {
            erros.escolhaB = '';
        }

        // criar nova votação
        if (valido) {
            let poll = {...fields, votosA: 0, votosB: 0, id: gerarID()};
            // salvar poll p/ armazenamento
            PollStore.update((atual) => {
                return [poll, ...atual];
            });
            dispatch('add');
        }


    }
</script>


<form on:submit|preventDefault={criarVotacao}>
    <div class="form-field">
        <label for="questao">Questão da Votação:</label>
        <input type="text" id="questao" autocomplete="off" bind:value={fields.questao}>
        <div class="erro">{ erros.questao }</div>
    </div>
    <div class="form-field">
        <label for="escolha-a">Primeira escolha:</label>
        <input type="text" id="escolha-a" autocomplete="off" bind:value={fields.escolhaA}>
        <div class="erro">{ erros.escolhaA }</div>
    </div>
    <div class="form-field">
        <label for="escolha-b">Segunda escolha:</label>
        <input type="text" id="escolha-b" autocomplete="off" bind:value={fields.escolhaB}>
        <div class="erro">{ erros.escolhaB }</div>
    </div>
    <Button botaoTipo="secundario">Adicionar Votação</Button>
</form>


<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field {
        margin: 18px auto;
    }
    input {
        width: 100%;
        border-radius: 6px;
    }
    label {
        margin: 10px auto;
        text-align: left;
    }
    .erro {
        font-weight: bold;
        font-size: 14px;
        color: #d91b42;
    }
    @media screen and (max-width: 420px) {
        form {
            width: 90%;
        }
    }
</style>