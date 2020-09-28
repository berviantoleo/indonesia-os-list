<template>
  <div id="app">
    <b-navbar type="is-light">
      <template slot="brand"
        ><b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1 class="title">IOSL</h1>
        </b-navbar-item></template
      >
      <template slot="start">
        <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
        <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button size="is-medium" icon-left="github">
              Github
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@mdi/font/css/materialdesignicons.css";
</style>
