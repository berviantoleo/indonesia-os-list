<template>
  <div id="app">
    <div class="sidebar-page">
      <section class="sidebar-layout">
        <o-sidebar fullheight class="has-text-centered" position="static" open>
          <h1 class="title is-1">IOL</h1>
          <section class="content has-text-centered" style="padding: 1em">
            <div><router-link class="title is-4" to="/">Home</router-link></div>
            <div>
              <router-link class="title is-4" to="/about">About</router-link>
            </div>
          </section>
        </o-sidebar>
        <router-view></router-view>
      </section>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Indonesia Operating System List</strong> by
          <a href="https://berviantoleo.my.id">Bervianto Leo Pratama</a>. The
          source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "~@mdi/font/css/materialdesignicons.css";
@import "bulma/sass";

.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}
</style>
