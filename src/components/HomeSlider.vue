<script>
export default {
  name: 'HomeSlider',
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  render (h) {
	let sliderImages = []
	if (this.items.length > 0) {
		sliderImages = this.items
		.filter((el) => el && Object.prototype.hasOwnProperty.call(el, 'image'))
		.map((el) => {
			const sliderImage = []
			const sliderOverlay = []
			if (Object.prototype.hasOwnProperty.call(el, 'title') || Object.prototype.hasOwnProperty.call(el, 'intro')) {
				const overlayContent = []
				const overlayTextContent = []
				// TITLE OF THE SLIDER
				if (Object.prototype.hasOwnProperty.call(el, 'title')) {
					const titleOverlay = h('h3', {
						domProps: {
							innerHTML: el.title
						},
						class: {
							'font-weight-lighter': true
						}
					})
					overlayContent.push(titleOverlay)
				}
				// INRO OF THE SLIDER
				if (Object.prototype.hasOwnProperty.call(el, 'intro')) {
					const titleOverlay = h('p', {
						domProps: {
							innerHTML: el.intro
						},
						class: {
							'font-weight-lighter': true
						}
					})
					overlayContent.push(titleOverlay)
				}
				// OVERLAY CONTENT
				if (overlayContent.length > 0) {
					const overlayContextContent = h('div', {
						class: {
							'overlay-content-text': true
						}
					}, overlayContent)
					overlayTextContent.push(overlayContextContent)
				}
				const overlayElement = h('div', {
					class: {
						'overlay-text': true
					}
				}, overlayTextContent)
				sliderOverlay.push(overlayElement)
			}
			sliderImage.push(h('div', {
                    style: {
                        'background-image': `url(${el.image})`
                    },
                    class: {
						'slider-image': true
                    }
            }, sliderOverlay))
			const slider = h('div',	{
				class: {
					'overlay-background': true
				}
			}, sliderImage)
			return h('b-col', {
				class: { 
					'px-0': true
				},
				props: {
					cols: '12',
					md: '3' 
				}
			}, [slider])
		})
	}
    return h('b-row', {
		class: { 
			'homeSlider': true 
		} 
	}, sliderImages)
  }
}
</script>
<style lang="scss">
.homeSlider {
	margin-top: 3.5rem;
    img {
        width: 100%;
    }
	.slider-image{
		height: 91vh;
		background-size: cover;
		background-repeat: no-repeat;
		&:hover .overlay-text{
			display: block;
		}
		.overlay-text {
			height: 91vh;
			color: #fff;
			background: rgba(0,0,0,0.4);
			text-align: center;
			padding: 15px;
			word-break: break-all;
			.overlay-content-text {
				margin-top: 40vh;
				h3 {
					text-transform: capitalize;
				}
			}
		}
	}
}
</style>