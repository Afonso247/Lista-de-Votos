<script>
	import Header from "./str/Header.svelte";
	import Footer from "./str/Footer.svelte";
	import PollLista from "./str/poll/PollLista.svelte";
	import CriarPollForm from "./str/CriarPollForm.svelte";
	import Tabs from "./str/components/Tabs.svelte";


	// tabs
	let items = ['Votações atuais', 'Adicionar uma nova votação'];
	let itemAtivo = 'Votações atuais';

	const trocarTab = (e) => {
		itemAtivo = e.detail;
	};


	// votações (polls)

	const addPoll = (e) => {
		itemAtivo = 'Votações atuais';
	}
</script>


<Header />
<main>

	<Tabs {itemAtivo} {items} on:trocarTab={trocarTab} />
	{#if itemAtivo === 'Votações atuais'}
		<PollLista />
	{:else if itemAtivo === 'Adicionar uma nova votação'}
		<CriarPollForm on:add={addPoll} />
	{/if}

</main>
<Footer />


<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>