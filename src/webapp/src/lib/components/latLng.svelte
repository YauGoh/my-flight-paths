<script lang="ts">
	import type { LatLng } from '$lib/models/aircraft';

	export let latLng: LatLng;
	export let locale: string = 'en-Au';

	const format = (value: number) =>
		value.toLocaleString(locale, {
			notation: 'compact',
			compactDisplay: 'short',
			minimumFractionDigits: 4
		});
</script>

<span class="lat-lng">({format(latLng.lat)},{format(latLng.lng)})</span>

<style lang="scss">
	.lat-lng {
	}
</style>
