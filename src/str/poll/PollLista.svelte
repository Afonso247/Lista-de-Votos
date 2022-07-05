<script>
    import { fade, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import PollStore from '../../../scripts/PollStore.js';
    import PollDetalhes from './PollDetalhes.svelte';
    // import { onMount, onDestroy } from 'svelte';

    // export let polls = [];

    // const unsub = PollStore.subscribe((data) => {
    //     polls = data;
    // });


    // onDestroy(() => {
    //     // retirar info do armazenamento
    //     console.log('Componente destruído.');
    //     unsub();
    // });

</script>


<div class="poll-lista">
    {#each $PollStore as poll (poll.id)}
        <div in:fade out:scale|local animate:flip={{duration: 500}}>
            <PollDetalhes {poll} />
        </div>
    {/each}
</div>


<style>
    .poll-lista {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        width: 90%;
    }
</style>