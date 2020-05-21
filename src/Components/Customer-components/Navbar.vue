<template>
	<div
		class='nav-container'
		:class='panelSwitch'>
		<div
			class='nav-panel'
			:class='togglerSwitch'>
			<router-link
				class='nav-logo'
				:to='{name:"Homepage"}'>
				<div
					class='glitch'
					data-text='WAVE'>
					WAVE
				</div>
			</router-link>
			<div
				class='nav-toggler'
				@click='openPanel'
			>
				<div></div>
			</div>
		</div>
		<button
			type='button'
			@click='closePanel'
			class='close-btn'>
			&times;
		</button>
		<div class='nav-wrapper'>
			<router-link
				class='nav_link'
				@click='closePanel'
				:to='{name:"Homepage"}'>
				首頁
			</router-link>
			<router-link
				class='nav_link'
				@click='closePanel'
				:to='{name:"Custom_products"}'>
				商品
			</router-link>
			<router-link
				class='nav_link'
				:to='{name:"Customer_QA"}'
				@click='closePanel'>
				問答
			</router-link>
			<router-link
				class='nav_link'
				to='/login'
				@click='closePanel'>
				管理員
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showPanel: false,
    };
  },
  methods: {
    openPanel() {
      const vm = this;
      vm.showPanel = true;
      vm.$emit('navOpen');
    },
    closePanel() {
      const vm = this;
      vm.showPanel = false;
      vm.$emit('navClose');
    },
  },
  computed: {
    panelSwitch() {
      const vm = this;
      if (vm.showPanel) {
        return 'show';
      }
      return '';
    },
    togglerSwitch() {
      const vm = this;
      if (vm.showPanel) {
        return 'fade';
      }
      return '';
    },
    logoSwitch() {
      const vm = this;
      if (vm.showLogo) {
        return '';
      }
      return 'fade';
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('home-navbarClose', () => {
      vm.closePanel();
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/all.scss';

.nav-container{
	position: fixed;
	top: 0;
	left: 0;
	z-index:10;
	opacity:0.8;
	width: 100%;
	height: 100vh;
	background: black;
	transform:translateY(-100%);
	transition:0.7s;
	.close-btn{
		position: absolute;
		top: 3%;
		right: 7%;
		background: transparent;
		border: none;
		color: white;
		font-size: 2rem;
	}
	.nav_link{
		color:white;
		font-size: 2rem;
		margin-top: 1rem;

		&:hover{
			color:lignten($primary, 10%);
			animation: text-flash 2s linear infinite;
		}
	}
}

.nav-wrapper{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 5rem;
	@include pad{
		margin-top: 5rem;
	}
	@include mobile-horizontal{
		margin-top: 2rem;
	}
}
.nav-container.show{
	transform:translateY(0);
}

@keyframes text-flash {
	0%{
		text-shadow: 3rem 1rem 0.3em $primary, 3rem 1rem 0.3rem $primary, 3rem 1rem 0.3rem $secondary;
	}
	33%{
		text-shadow: 3rem 1rem 0.3em $primary, 3rem 1rem 0.3rem $primary, 3rem 1rem 0.3rem $secondary;
	}
	44%{
		text-shadow: 3rem 1rem 0.7em $primary, 3rem 1rem 0.4rem $primary, 3rem 1rem 0.1rem $secondary;
	}
	100%{
		text-shadow: 3rem 1rem 0.3em $primary, 3rem 1rem 0.3rem $primary, 3rem 1rem 0.3rem $secondary;
	}
}

.nav-panel{
	position: absolute;
	top: calc(100%);
	background: rgba(73, 80, 87, 0.3);
	height: 75px;
	width: 100vw;
	display:flex;
	justify-content: space-between;
	align-items:center;
	padding:0 2rem;
	@include mobile{
		padding:0 1rem;
	}

	.nav-toggler{
		@include sizing(55px);
		border:2px solid white;
		border-radius: 0.25rem;
		position:relative;
		&:before, &:after, div{
			width:80%;
			height:3px;
			background:white;
			position:absolute;
			left:50%;
			transform:translateX(-50%) translateY(-50%);
			}
		&:before, &:after{
			content:'';
			display:block;
		}
		div{
			top:50%;
		}
		&:before{
			top:25%;
		}
		&:after{
			top:75%;
		}
		&:hover{
			cursor: pointer;
			&:before{
				animation: wave 1s ease-in infinite;
			}
			div{
				animation: wave 1s 0.1s ease-in infinite;
			}
			&:after{
				animation: wave 1s 0.2s ease-in infinite;
			}
		}
	}
	.glitch{
		font-size: 3rem !important;
	}
	.nav-logo .fade{
		display:none !important;
	}


}

.nav-panel.fade{
	display:none;
}
@keyframes wave{
	20%{
		transform:translateX(-50%) translateY(-7px);
	}
	50%{
		transform:translateX(-50%) translateY(-50%);
	}
}
</style>
