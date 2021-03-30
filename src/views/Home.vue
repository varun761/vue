<template>
  <b-container fluid>
    <nav-bar
      :items="items"
      logo-text="Logo Here"
      fixed="top"
    />
    <home-slider :items="sliderItems" />
    <b-row class="py-4">
      <b-col
        cols="12"
        class="text-center mb-3"
      >
        <h2 class="font-weight-lighter">
          Services
        </h2>
      </b-col>
      <b-col cols="12">
        <b-row>
          <services-card :sections="services" />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NavBar from '../components/NavBar'
import HomeSlider from '../components/HomeSlider'
import ServicesCard from '../components/ServicesCard'

export default {
    components: {
        NavBar,
        HomeSlider,
        ServicesCard
    },
    data () {
      return {
        services: [
          {
            title: 'App Development',
            innerText: 'App Development'
          },
          {
            title: 'Website Development',
            innerText: 'Website Development'
          },
          {
            title: 'Wordpress Plugin Development',
            innerText: 'Wordpress Plugin Development'
          },
          {
            title: 'App Development',
            innerText: 'App Development'
          },
          {
            title: 'Website Development',
            innerText: 'Website Development'
          },
          {
            title: 'Wordpress Plugin Development',
            innerText: 'Wordpress Plugin Development'
          }
        ],
        sliderItems: [
          {
            image: 'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            title: 'Services',
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur egestas mi vel magna efficitur, et posuere tellus fermentum. Sed vehicula lobortis diam, eu venenatis odio aliquam at. Donec vitae massa nisi. Cras rhoncus porttitor efficitur. Mauris risus tortor, viverra ut condimentum eu, ornare eu dui. Mauris cursus sagittis erat. Pellentesque finibus feugiat odio sed ullamcorper. Nunc massa sapien, faucibus ac tellus vel, sagittis ultrices augue.',
            button: 'Sample'
          },
          {
            image: 'https://image.shutterstock.com/image-photo/fashionable-asian-woman-carrying-shopping-600w-1846118029.jpg',
            title: 'About us',
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur egestas mi vel magna efficitur, et posuere tellus fermentum. Sed vehicula lobortis diam, eu venenatis odio aliquam at. Donec vitae massa nisi. Cras rhoncus porttitor efficitur. Mauris risus tortor, viverra ut condimentum eu, ornare eu dui. Mauris cursus sagittis erat. Pellentesque finibus feugiat odio sed ullamcorper. Nunc massa sapien, faucibus ac tellus vel, sagittis ultrices augue.',
            button: 'Sample 2'
          },
          {
            image: 'https://image.shutterstock.com/image-photo/fashionable-asian-woman-carrying-shopping-600w-1846118029.jpg',
            title: 'Testimonial',
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur egestas mi vel magna efficitur, et posuere tellus fermentum. Sed vehicula lobortis diam, eu venenatis odio aliquam at. Donec vitae massa nisi. Cras rhoncus porttitor efficitur. Mauris risus tortor, viverra ut condimentum eu, ornare eu dui. Mauris cursus sagittis erat. Pellentesque finibus feugiat odio sed ullamcorper. Nunc massa sapien, faucibus ac tellus vel, sagittis ultrices augue.',
            button: 'Sample 2'
          },
          {
            image: 'https://image.shutterstock.com/image-photo/fashionable-asian-woman-carrying-shopping-600w-1846118029.jpg',
            title: 'Contact Us',
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur egestas mi vel magna efficitur, et posuere tellus fermentum. Sed vehicula lobortis diam, eu venenatis odio aliquam at. Donec vitae massa nisi. Cras rhoncus porttitor efficitur. Mauris risus tortor, viverra ut condimentum eu, ornare eu dui. Mauris cursus sagittis erat. Pellentesque finibus feugiat odio sed ullamcorper. Nunc massa sapien, faucibus ac tellus vel, sagittis ultrices augue.',
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