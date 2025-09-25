export default function loginPage(c: any) {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Martech Master</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
            <i class="fas fa-rocket text-pink-500 text-5xl mb-4"></i>
            <h1 class="text-3xl font-bold text-white">Martech Master</h1>
            <p class="text-gray-300 mt-2">Faça login para continuar</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <form id="loginForm" class="space-y-6">
                <!-- Email Field -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                        Email
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-envelope text-gray-400"></i>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            class="w-full pl-10 pr-3 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                            placeholder="seu@email.com"
                        >
                    </div>
                </div>

                <!-- Password Field -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                        Senha
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-lock text-gray-400"></i>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            class="w-full pl-10 pr-10 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                            placeholder="••••••••"
                        >
                        <button
                            type="button"
                            onclick="togglePassword()"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <i id="passwordIcon" class="fas fa-eye text-gray-400 hover:text-white"></i>
                        </button>
                    </div>
                </div>

                <!-- Remember & Forgot -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-600 rounded bg-white/10"
                        >
                        <label for="remember" class="ml-2 block text-sm text-gray-300">
                            Lembrar de mim
                        </label>
                    </div>
                    <button type="button" onclick="forgotPassword()" class="text-sm text-pink-400 hover:text-pink-300">
                        Esqueceu a senha?
                    </button>
                </div>

                <!-- Error Message -->
                <div id="errorMessage" class="hidden bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    <span id="errorText"></span>
                </div>

                <!-- Success Message -->
                <div id="successMessage" class="hidden bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span id="successText"></span>
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    id="submitBtn"
                    class="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
                >
                    <i class="fas fa-sign-in-alt mr-2"></i>
                    Entrar
                </button>
            </form>

            <!-- Divider -->
            <div class="mt-6 flex items-center">
                <div class="flex-1 border-t border-gray-600"></div>
                <span class="px-4 text-gray-400 text-sm">ou</span>
                <div class="flex-1 border-t border-gray-600"></div>
            </div>

            <!-- Social Login -->
            <div class="mt-6 space-y-3">
                <button class="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center">
                    <i class="fab fa-google mr-2"></i>
                    Continuar com Google
                </button>
                <button class="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center">
                    <i class="fab fa-linkedin mr-2"></i>
                    Continuar com LinkedIn
                </button>
            </div>
        </div>

        <!-- Sign Up Link -->
        <p class="text-center text-gray-300 mt-6">
            Não tem uma conta?
            <a href="#" class="text-pink-400 hover:text-pink-300 font-medium">Cadastre-se</a>
        </p>

        <!-- Back to Home -->
        <p class="text-center mt-4">
            <a href="/" class="text-gray-400 hover:text-white">
                <i class="fas fa-arrow-left mr-2"></i>
                Voltar ao início
            </a>
        </p>
    </div>

    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordIcon = document.getElementById('passwordIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            const successDiv = document.getElementById('successMessage');
            
            successDiv.classList.add('hidden');
            errorText.textContent = message;
            errorDiv.classList.remove('hidden');
            
            setTimeout(() => {
                errorDiv.classList.add('hidden');
            }, 5000);
        }

        function showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            const successText = document.getElementById('successText');
            const errorDiv = document.getElementById('errorMessage');
            
            errorDiv.classList.add('hidden');
            successText.textContent = message;
            successDiv.classList.remove('hidden');
        }

        function forgotPassword() {
            const email = document.getElementById('email').value;
            if (!email) {
                showError('Digite seu email primeiro');
                return;
            }
            
            fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showSuccess('Instruções de reset enviadas para seu email');
                } else {
                    showError(data.error || 'Erro ao processar solicitação');
                }
            })
            .catch(err => {
                showError('Erro de conexão');
            });
        }

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Entrando...';
            
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Store token
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    showSuccess('Login realizado com sucesso! Redirecionando...');
                    
                    setTimeout(() => {
                        window.location.href = '/portal';
                    }, 1500);
                } else {
                    showError(data.error || 'Credenciais inválidas');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
                }
            } catch (error) {
                showError('Erro de conexão com o servidor');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
            }
        });
    </script>
</body>
</html>
  `)
}