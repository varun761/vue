<template>
  <BasicLayout>
    <!--Home Slider-->
    <section class="slider">
      <b-container fluid>
        <home-slider :items="sliderItems" />
      </b-container>
    </section>
    <!--Services-->
    <section class="services">
      <b-container fluid>
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
    </section>
  </BasicLayout>
</template>

<script>
import BasicLayout from './layouts/BasicLayout'
import HomeSlider from '../components/HomeSlider'
import ServicesCard from '../components/ServicesCard'

export default {
    components: {
        BasicLayout,
        HomeSlider,
        ServicesCard
    },
    data () {
      return {
        services: [
          {
            title: 'Backend Development',
            description: 'We provide service for backend development',
            features: [
              'API development',
              'Web development',
              'Payment integration',
              'Third party login',
              'SSO'
            ]
          },
          {
            title: 'Wordpress Development',
            description: 'We provide service for wordpress customization',
            features: [
              'Plugin Development',
              'Theme Development',
              'BuddyPress Customization',
              'Theme Customization',
              'Wocommerce Integration'
            ]
          },
          {
            title: 'E-commerce Development',
            description: 'We provide service for online store setup',
            features: [
              'Shopify',
              'Magento',
              'Wordpress',
              'Bigcommerce',
              'Laravel'
            ]
          },
          {
            title: 'Bigcommerce Development',
            description: 'We provide service to customize and setup your bigcommerce store',
            features: [
              'Extension Development',
              'Theme development',
              'Checkout customization'
            ]
          },
          {
            title: 'Front-End Development',
            description: 'We provide service for single page applications',
            features: [
              'Vue',
              'React',
              'Angular'
            ]
          },
          {
            title: 'App Development',
            description: 'We provide service to develope the hybrid application for ios and android based operating systems',
            features: [
              'Flutter',
              'React Native',
              'Vue Native'
            ]
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
      }
    }
}
</script>