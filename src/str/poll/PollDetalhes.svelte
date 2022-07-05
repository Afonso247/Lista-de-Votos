<script>
    import PollStore from '../../../scripts/PollStore.js';
    import Card from "../components/Card.svelte";
    import Button from "../components/Button.svelte";
    import { tweened } from 'svelte/motion';

    export let poll;


    // porcentagens tweened
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);

    // valores reativos
    $: votoTotal = poll.votosA + poll.votosB;
    $: porcentagemA = Math.floor(100 / votoTotal * poll.votosA) || 0;
    $: porcentagemB = Math.floor(100 / votoTotal * poll.votosB) || 0;

    $: tweenedA.set(porcentagemA);
    $: tweenedB.set(porcentagemB);
    // $: console.log($tweenedA, $tweenedB);

    // alterar votos
    function altVoto(escolha, id) {
        PollStore.update((atual) => {

            let pollsCopycat = [...atual];
		    let pollVotado = pollsCopycat.find((poll) => poll.id == id);

		    if (escolha === 'A') {
			    pollVotado.votosA++;
		    }
		    if (escolha === 'B') {
			    pollVotado.votosB++;
		    }

		    return pollsCopycat;
        });
    };

    // remover poll
    function removerPoll(id) {
        PollStore.update((atual) => {
            return atual.filter(poll => poll.id != id);
        })
    }
</script>

<Card>
<div class="poll">

    <h3>{ poll.questao }</h3>
    <p>Total de votos: { votoTotal }</p>
    <div class="escolha" on:click={() => altVoto('A', poll.id)}>
        <div class="porcentagem porcentagem-A" style="width: {$tweenedA}%"></div>
        <span>{ poll.escolhaA } ({ poll.votosA })</span>
    </div>
    <div class="escolha" on:click={() => altVoto('B', poll.id)}>
        <div class="porcentagem porcentagem-B" style="width: {$tweenedB}%"></div>
        <span>{ poll.escolhaB } ({ poll.votosB })</span>
    </div>
    <div class="delete">
        <Button botaoFlat={true} on:click={() => removerPoll(poll.id)}>Remover</Button>
    </div>

</div>
</Card>


<style>
    h3 {
        margin: 0 auto;
        color: #555;
    }
    p {
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }
    .escolha {
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }
    .escolha:hover {
        opacity: 0.6;
    }
    span {
        display: inline-block;
        padding: 10px 20px;
    }
    .porcentagem {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }
    .porcentagem-A {
        border-left: 4px solid #d91b42;
        background: rgba(217, 27, 66, 0.2);
    }
    .porcentagem-B {
        border-left: 4px solid #45c496;
        background: rgba(69, 196, 150, 0.2);
    }
    .delete {
        margin-top: 30px;
        text-align: center;
    }
</style>
