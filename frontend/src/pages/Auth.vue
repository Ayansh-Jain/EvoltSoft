<template>
  <div class="auth-wrapper">
    <transition name="fade-slide" mode="out-in">
      <div class="auth-container" key="auth">
        <div class="auth-header">
          <h1>Welcome</h1>
          <p>{{ mode === 'login' ? 'Sign in to your account' : 'Create your account' }}</p>
        </div>
        
        <div class="mode-slider">
          <button 
            :class="{ active: mode === 'login' }" 
            @click="switchMode('login')"
            class="mode-btn"
          >
            Login
          </button>
          <button 
            :class="{ active: mode === 'signup' }" 
            @click="switchMode('signup')"
            class="mode-btn"
          >
            Sign Up
          </button>
          <div class="slider-indicator" :class="mode"></div>
        </div>

        <transition name="form-slide" mode="out-in">
          <form v-if="mode === 'login'" @submit.prevent="login" class="auth-form" key="login">
            <div class="form-group">
              <label for="login-username">Username</label>
              <input 
                id="login-username"
                v-model="loginUsername" 
                placeholder="Enter your username" 
                required 
                class="form-input"
                :class="{ error: loginError }"
              />
            </div>
            
            <div class="form-group">
              <label for="login-password">Password</label>
              <input 
                id="login-password"
                v-model="loginPassword" 
                type="password" 
                placeholder="Enter your password" 
                required 
                class="form-input"
                :class="{ error: loginError }"
              />
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span class="btn-text">{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
              <div v-if="isLoading" class="loader"></div>
            </button>
            
            <transition name="error-slide">
              <div v-if="loginError" class="error-message">
                <i class="error-icon">⚠</i>
                {{ loginError }}
              </div>
            </transition>
          </form>

          <form v-else @submit.prevent="signup" class="auth-form" key="signup">
            <div class="form-group">
              <label for="signup-username">Username</label>
              <input 
                id="signup-username"
                v-model="signupUsername" 
                placeholder="Choose a username" 
                required 
                class="form-input"
                :class="{ error: signupError }"
              />
            </div>
            
            <div class="form-group">
              <label for="signup-password">Password</label>
              <input 
                id="signup-password"
                v-model="signupPassword" 
                type="password" 
                placeholder="Create a password" 
                required 
                class="form-input"
                :class="{ error: signupError }"
              />
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span class="btn-text">{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
              <div v-if="isLoading" class="loader"></div>
            </button>
            
            <transition name="error-slide">
              <div v-if="signupError" class="error-message">
                <i class="error-icon">⚠</i>
                {{ signupError }}
              </div>
            </transition>
            
            <transition name="success-slide">
              <div v-if="signupSuccess" class="success-message">
                <i class="success-icon">✓</i>
                {{ signupSuccess }}
              </div>
            </transition>
          </form>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Auth',
  data() {
    return {
      mode: 'login',
      isLoading: false,
      // Login
      loginUsername: '',
      loginPassword: '',
      loginError: '',
      // Signup
      signupUsername: '',
      signupPassword: '',
      signupError: '',
      signupSuccess: '',
    };
  },
  methods: {
    switchMode(newMode) {
      this.mode = newMode;
      this.clearMessages();
    },
    
    clearMessages() {
      this.loginError = '';
      this.signupError = '';
      this.signupSuccess = '';
    },
    
    async login() {
      this.loginError = '';
      this.isLoading = true;
      
      try {
        const res = await axios.post('/auth/login', {
          username: this.loginUsername,
          password: this.loginPassword,
        });
        
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        // Add success feedback before navigation
        setTimeout(() => {
          this.$router.push('/');
        }, 500);
        
      } catch (err) {
        this.loginError = err.response?.data?.message || 'Login failed';
      } finally {
        this.isLoading = false;
      }
    },
    
    async signup() {
      this.signupError = '';
      this.signupSuccess = '';
      this.isLoading = true;
      
      try {
        await axios.post('/auth/register', {
          username: this.signupUsername,
          password: this.signupPassword,
        });
        
        this.signupSuccess = 'Registration successful! You can now log in.';
        this.signupUsername = '';
        this.signupPassword = '';
        
        // Auto-switch to login after success
        setTimeout(() => {
          this.mode = 'login';
        }, 2000);
        
      } catch (err) {
        this.signupError = err.response?.data?.message || 'Sign up failed';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-container {
  max-width: 420px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: containerFloat 6s ease-in-out infinite;
}

@keyframes containerFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h1 {
  color: #333;
  font-size: 2.5em;
  margin: 0 0 10px 0;
  font-weight: 300;
  letter-spacing: -1px;
}

.auth-header p {
  color: #666;
  margin: 0;
  font-size: 1.1em;
}

.mode-slider {
  display: flex;
  position: relative;
  margin-bottom: 30px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mode-btn {
  flex: 1;
  padding: 14px 0;
  background: none;
  border: none;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
  z-index: 2;
}

.mode-btn.active {
  color: #fff;
}

.slider-indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: calc(50% - 4px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.slider-indicator.login {
  left: 4px;
}

.slider-indicator.signup {
  left: calc(50% + 4px);
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 0.95em;
}

.form-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1em;
  background: #fff;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-input.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
  font-size: 0.9em;
  margin-top: 10px;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #efe;
  border: 1px solid #cfc;
  border-radius: 8px;
  color: #3c3;
  font-size: 0.9em;
  margin-top: 10px;
}

.error-icon, .success-icon {
  font-weight: bold;
  font-size: 1.1em;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.error-slide-enter-active,
.success-slide-enter-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from,
.success-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-slide-leave-active,
.success-slide-leave-active {
  transition: all 0.2s ease;
}

.error-slide-leave-to,
.success-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 480px) {
  .auth-wrapper {
    padding: 10px;
  }
  
  .auth-container {
    padding: 30px 20px;
  }
  
  .auth-header h1 {
    font-size: 2em;
  }
  
  .form-input {
    padding: 14px;
  }
  
  .submit-btn {
    padding: 14px;
  }
}
</style>