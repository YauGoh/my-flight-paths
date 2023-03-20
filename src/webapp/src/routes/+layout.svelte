<script lang="ts">
	import '../styles/styles.scss';
</script>

<div class="layout">
	<div class="layout__header">Something</div>
	<div class="layout__body">
		<slot />
	</div>
	<div class="layout__footer">Somthing</div>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		height: 100%;

		&__body {
			flex: 1;

			display: flex;
			flex-direction: column;
		}
	}
</style>
