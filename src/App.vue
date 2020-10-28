<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
        <v-list app temporary>
          <v-subheader>Actions</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in showLinks"
              :key="i"
              :to="item.url"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logOut" v-if="isUserLoggedIn">
              <v-list-item-icon>
                <v-icon>mdi-lock-open</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Exit</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="showDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Your TODO</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="(item, index) in showLinks" :key="index" :to="item.url">
          {{item.text}}
          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
        <v-btn text @click="logOut" v-if="isUserLoggedIn">
          Exit
          <v-icon>mdi-lock-open</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <template v-if="error">
        <v-snackbar
          :multi-line="true"
          :timeout="5000"
          :value="true"
        >
          {{error}}
          <v-btn
            color="red"
            @click.native="closeError"
          >
            Close
          </v-btn>
        </v-snackbar>
      </template>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      item: 1,
      show: false,
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      console.log(this.$store.getters.isUserLoggedIn)
      return this.$store.getters.isUserLoggedIn
    },
    notes () {
      return this.$store.getters.notes
    },
    showLinks () {
      if (this.isUserLoggedIn) {
        return [
          { text: 'New note', icon: 'mdi-label', url: '/new' }
        ]
      } else {
        return [
          { text: 'Login', icon: 'mdi-lock', url: '/login' },
          { text: 'Registration', icon: 'mdi-account', url: '/registration' }
        ]
      }
    }
  },
  methods: {
    showDrawer () {
      this.drawer = true
    },
    closeError () {
      this.$store.dispatch('clearError')
    },
    logOut () {
      this.$store.dispatch('onLogOut')
      this.$router.push('/login')
    }
  },
  filters: {
    toUpperCase (value) {
      if (!value) return ''
      return value.toUpperCase()
    }
  }
}
</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
