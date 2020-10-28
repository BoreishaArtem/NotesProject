<template>
  <v-container
    class="pt-16 mt-16"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-5">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Registration</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                label="Email"
                name="email"
                :rules="emailRules"
                prepend-icon="mdi-email-outline"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                name="password"
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                type="password"
                :counter="6"
                v-model="password"
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                name="confirmPassword"
                :rules="confirmPasswordRules"
                prepend-icon="mdi-lock-check"
                type="password"
                v-model="confirmPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onLogin"
              :loading="loading"
              :disabled="!valid || loading"
            >Create Account!</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirmed password is required',
        v => v === this.password || 'Password should match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLogin () {
      if (this.$refs.form.validate() === true) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          }).catch(error => console.log(error.message))
      }
    }
  }
}
</script>

<style scoped>

</style>
