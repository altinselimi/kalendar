<template>
	<div class="hello">
		<a href="https://github.com/altinselimi/kalendar" class="github-link">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
				<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
			</svg>
			Github
		</a>
		<div class="text-wrap">
			<h1>Kalendar</h1>
			<p class="small-description">Your best friend when it comes to event managment in
				<a href="https://github.com/altinselimi/kalendar">Vue</a>,
				<a href="https://github.com/akxcv/vuera">React</a> or
				<a class="soon">Angular.</a>
			</p>
		</div>
		<section class="in-action animate-section">
			<p>See it in action</p>
			<a>
				<span></span>
				<span></span>
			</a>
		</section>
	</div>
</template>
<style lang="scss">
$blue: #007FFF;
$yellow: #F5D547;
$dark: #3C3C3B;
h1,
h2,
h3,
h4 {
	font-family: 'Lato';
}

.text-wrap {
	display: flex;
	align-items: center;
	flex-direction: column;
	max-width: 500px;
	text-align: center;
}

.github-link {
	display: flex;
	align-items: center;
	svg {
		stroke: white;
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
	color: white;
	text-decoration: none;
	position: absolute;
	top: 15px;
	right: 15px;
	font-weight: 500;
	opacity: .7;
	&:hover,
	&:focus {
		opacity: .9;
	}
}

.small-description {
	a {
		text-decoration: none;
		font-weight: 500;
		font-size: 110%;
		color: white;
	}
	.soon {
		opacity: .5;
	}
}

.hello {
	background-color: $blue;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 20px 0px;
	min-height: 400px;
	h1,
	p {
		margin: 0px;
	}
	h1 {
		font-size: 64px;
		margin-bottom: 10px;
	}
}

.in-action a {
	-webkit-transform: translate(0, -50%);
	transform: translate(0, -50%);
	color: #fff;
	font: normal 400 20px/1 inherit;
	letter-spacing: .1em;
	text-decoration: none;
	transition: opacity .3s;
	position: relative;
}

.in-action a:hover {
	opacity: .5;
}

.animate-section {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 40px;
	a {
		transform: scaleX(1.2) scale(.8);
	}
	p {}
}

.animate-section a span {
	opacity: .7;
	position: absolute;
	top: 0;
	left: 50%;
	width: 15px;
	height: 15px;
	margin-left: -12px;
	border-left: 1px solid #fff;
	border-bottom: 1px solid #fff;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	-webkit-animation: sdb07 2s infinite;
	animation: sdb07 2s infinite;
	opacity: 0;
	box-sizing: border-box;
}

.animate-section a span:nth-of-type(1) {
	-webkit-animation-delay: 0s;
	animation-delay: 0s;
}

.animate-section a span:nth-of-type(2) {
	top: 8px;
	-webkit-animation-delay: .15s;
	animation-delay: .15s;
}

@keyframes sdb07 {
	0% {
		opacity: .5;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: .5;
	}
}

</style>
