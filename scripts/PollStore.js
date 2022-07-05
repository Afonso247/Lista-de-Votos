import { writable } from 'svelte/store';

const PollStore = writable([
    {
        id: '1a1a',
        questao: 'Python ou JavaScript?',
        escolhaA: 'Python',
        escolhaB: 'JavaScript',
        votosA: 9,
        votosB: 15
    }
]);

export default PollStore;