<template>
  <div class="wrapper">
    <header>
      <b-container fluid>
        <!--NavBar-->
        <nav-bar
          :items="items"
          logo-text="Logo Here"
          fixed="top"
        />
      </b-container>
    </header>
    <slot />
    <!--FOOTER--->
    <footer>
      <b-container class="py-5">
        <b-row>
          <b-col
            class="footer-sections"
            cols="12"
            md="3"
          >
            <h5>Our Company</h5>
            <ul>
              <li>About Us</li>
              <li>Why Choose Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>News</li>
            </ul>
          </b-col>
          <b-col
            class="footer-sections"
            cols="12"
            md="3"
          >
            <h5>Our Company</h5>
            <ul>
              <li>About Us</li>
              <li>Why Choose Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>News</li>
            </ul>
          </b-col>
          <b-col
            class="footer-sections"
            cols="12"
            md="3"
          >
            <h5>Our Company</h5>
            <ul>
              <li>About Us</li>
              <li>Why Choose Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>News</li>
            </ul>
          </b-col>
          <b-col
            class="footer-sections"
            cols="12"
            md="3"
          >
            <h5>Our Company</h5>
            <ul>
              <li>About Us</li>
              <li>Why Choose Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>News</li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="py-3">
        <b-row>
          <b-col>
            <div class="d-flex">
              <div class="d-flex-column">
                Copyright 2021 - Varun Sharma
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
export default {
  name: "BasicLayout",
  components: { NavBar },
  data() {
    return {
      items: [
        {
          title: "Home",
          child: [
            {
              title: "DropDown",
            },
          ],
        },
        {
          title: "About Us",
        },
        {
          title: "Plans",
        },
        {
          title: "Contact Us",
        },
        {
          title: "Login",
          path: "login",
        },
      ],
    };
  },
};
</script>