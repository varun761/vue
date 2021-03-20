<template>
  <b-container fluid>
    <b-row>
      <b-col class="px-0">
        <nav-bar
          :items="items"
          logo-text="Logo Here"
          fixed="top"
        />
      </b-col>
    </b-row>
    <home-slider :items="sliderItems" />
  </b-container>
</template>

<script>
import NavBar from '../components/NavBar'
import HomeSlider from '../components/HomeSlider'

export default {
    components: {
        NavBar,
        HomeSlider
    },
    data () {
      return {
        sliderItems: [
            {
				image: 'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
				title: 'About us',
				intro: 'Sample text',
				button: 'Sample'
			},
			{
				image: 'https://image.shutterstock.com/image-photo/fashionable-asian-woman-carrying-shopping-600w-1846118029.jpg',
				title: 'Testimonial',
				intro: 'Sample text',
				button: 'Sample 2'
			},
			{
				image: 'https://image.shutterstock.com/image-photo/fashionable-asian-woman-carrying-shopping-600w-1846118029.jpg',
				title: 'Testimonial',
				intro: 'Sample text',
				button: 'Sample 2'
			},
			{
				image: 'https://image.shutterstock.com/image-photo/fashionable-asian-woman-carrying-shopping-600w-1846118029.jpg',
				title: 'Testimonial',
				intro: 'Sample text',
				button: 'Sample 2'
			}
        ],
        items: [
            {
                title: 'Home',
                child: [
                    {
                        title: 'DropDown'
                    }
                ]
            },
            {
                title: 'About Us'
            },
            {
                title: 'Plans'
            },
            {
                title: 'Contact Us'
            }
        ]
      }
    }
}
</script>