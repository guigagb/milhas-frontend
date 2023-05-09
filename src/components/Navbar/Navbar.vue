<template>
	<div>
		<div class="py-3 px-6 d-flex space-between align-center">
			<div>
				<h2>{{$route.meta.label}}</h2>
			</div>
			<v-spacer></v-spacer>
			<div>
				<label class="mr-2 font-weight-medium">GUILHERME</label>
				<v-avatar :size="30">
					<img src="https://avatars.githubusercontent.com/u/42628942?v=4" alt="alt" />
				</v-avatar>
			</div>
		</div>
		<v-divider class></v-divider>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>