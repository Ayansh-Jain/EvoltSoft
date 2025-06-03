<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
    <router-link to="/signup" class="link">Don't have an account? Sign Up</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/auth/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        this.$router.push('/');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    },
  },
};
</script>

<style scoped>
.login-container { max-width: 300px; margin: 100px auto; padding: 2em; border: 1px solid #ccc; border-radius: 8px; background: #fafbfc; }
input { display: block; width: 100%; margin-bottom: 1em; padding: 0.5em; border-radius: 4px; border: 1px solid #bbb; }
button { width: 100%; padding: 0.5em; background: #1976d2; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
button:hover { background: #125ea2; }
.error { color: red; margin-top: 1em; }
.link { display: block; margin-top: 1em; text-align: center; color: #1976d2; text-decoration: none; }
.link:hover { text-decoration: underline; }
</style>
