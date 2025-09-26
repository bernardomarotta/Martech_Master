const profileHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Perfil - Martech Master</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
    <!-- Navigation -->
    <nav class="bg-black/50 backdrop-blur-lg fixed w-full z-50 border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-8">
                    <a href="/" class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Martech Master
                    </a>
                    <a href="/portal" class="text-gray-300 hover:text-white transition">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar ao Portal
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    <span id="userEmail" class="text-sm text-gray-400"></span>
                    <button onclick="logout()" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                        <i class="fas fa-sign-out-alt mr-2"></i>Sair
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-24 pb-12 px-4">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold mb-8">
                <i class="fas fa-user-circle mr-3"></i>Meu Perfil
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Sidebar -->
                <div class="md:col-span-1">
                    <div class="glass-effect rounded-xl p-6">
                        <div class="text-center mb-6">
                            <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <i class="fas fa-user text-4xl"></i>
                            </div>
                            <h2 id="userName" class="text-xl font-semibold mb-1">Carregando...</h2>
                            <p id="userRole" class="text-sm text-gray-400"></p>
                            <p id="userTier" class="text-xs bg-purple-600 px-2 py-1 rounded-full inline-block mt-2"></p>
                        </div>

                        <div class="space-y-2 text-sm">
                            <button onclick="showSection('info')" class="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition section-btn" data-section="info">
                                <i class="fas fa-info-circle mr-2"></i>Informações
                            </button>
                            <button onclick="showSection('password')" class="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition section-btn" data-section="password">
                                <i class="fas fa-key mr-2"></i>Alterar Senha
                            </button>
                            <button onclick="showSection('activity')" class="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition section-btn" data-section="activity">
                                <i class="fas fa-history mr-2"></i>Atividade
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="md:col-span-2">
                    <!-- Info Section -->
                    <div id="info-section" class="glass-effect rounded-xl p-6 section-content">
                        <h3 class="text-2xl font-semibold mb-6">
                            <i class="fas fa-info-circle mr-2"></i>Informações da Conta
                        </h3>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Nome</label>
                                <input type="text" id="editName" class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none">
                            </div>
                            
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Email</label>
                                <input type="email" id="editEmail" class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-gray-500" disabled>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm text-gray-400 mb-2">Função</label>
                                    <input type="text" id="editRole" class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-gray-500" disabled>
                                </div>
                                
                                <div>
                                    <label class="block text-sm text-gray-400 mb-2">Plano</label>
                                    <input type="text" id="editTier" class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-gray-500" disabled>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Membro desde</label>
                                <input type="text" id="editCreatedAt" class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-gray-500" disabled>
                            </div>
                            
                            <button onclick="updateProfile()" class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition">
                                <i class="fas fa-save mr-2"></i>Salvar Alterações
                            </button>
                        </div>
                    </div>

                    <!-- Password Section -->
                    <div id="password-section" class="glass-effect rounded-xl p-6 section-content hidden">
                        <h3 class="text-2xl font-semibold mb-6">
                            <i class="fas fa-key mr-2"></i>Alterar Senha
                        </h3>
                        
                        <form onsubmit="changePassword(event)" class="space-y-4">
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Senha Atual</label>
                                <div class="relative">
                                    <input type="password" id="currentPassword" required
                                        class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none pr-10">
                                    <button type="button" onclick="togglePassword('currentPassword')" class="absolute right-2 top-2 text-gray-400 hover:text-white">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Nova Senha</label>
                                <div class="relative">
                                    <input type="password" id="newPassword" required minlength="6"
                                        class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none pr-10">
                                    <button type="button" onclick="togglePassword('newPassword')" class="absolute right-2 top-2 text-gray-400 hover:text-white">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                            </div>
                            
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Confirmar Nova Senha</label>
                                <div class="relative">
                                    <input type="password" id="confirmPassword" required minlength="6"
                                        class="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none pr-10">
                                    <button type="button" onclick="togglePassword('confirmPassword')" class="absolute right-2 top-2 text-gray-400 hover:text-white">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div id="passwordError" class="hidden text-red-500 text-sm"></div>
                            <div id="passwordSuccess" class="hidden text-green-500 text-sm"></div>
                            
                            <button type="submit" class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition">
                                <i class="fas fa-lock mr-2"></i>Alterar Senha
                            </button>
                        </form>
                    </div>

                    <!-- Activity Section -->
                    <div id="activity-section" class="glass-effect rounded-xl p-6 section-content hidden">
                        <h3 class="text-2xl font-semibold mb-6">
                            <i class="fas fa-history mr-2"></i>Histórico de Atividade
                        </h3>
                        
                        <div id="activityList" class="space-y-3">
                            <div class="text-gray-400">Carregando atividades...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let userData = null;

        // Carregar dados do perfil
        async function loadProfile() {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            try {
                const response = await fetch('/api/profile', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to load profile');
                }

                const data = await response.json();
                userData = data.user;

                // Atualizar UI
                document.getElementById('userName').textContent = userData.name;
                document.getElementById('userEmail').textContent = userData.email;
                document.getElementById('userRole').textContent = userData.role === 'admin' ? 'Administrador' : 'Membro';
                document.getElementById('userTier').textContent = userData.subscription_tier.toUpperCase();

                // Preencher formulário
                document.getElementById('editName').value = userData.name;
                document.getElementById('editEmail').value = userData.email;
                document.getElementById('editRole').value = userData.role === 'admin' ? 'Administrador' : 'Membro';
                document.getElementById('editTier').value = userData.subscription_tier.toUpperCase();
                document.getElementById('editCreatedAt').value = new Date(userData.created_at).toLocaleDateString('pt-BR');

            } catch (error) {
                console.error('Error loading profile:', error);
                alert('Erro ao carregar perfil');
            }
        }

        // Atualizar perfil
        async function updateProfile() {
            const token = localStorage.getItem('token');
            const name = document.getElementById('editName').value;

            try {
                const response = await fetch('/api/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ name })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Perfil atualizado com sucesso!');
                    loadProfile();
                } else {
                    alert(data.error || 'Erro ao atualizar perfil');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Erro ao atualizar perfil');
            }
        }

        // Alterar senha
        async function changePassword(event) {
            event.preventDefault();

            const token = localStorage.getItem('token');
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Limpar mensagens anteriores
            document.getElementById('passwordError').classList.add('hidden');
            document.getElementById('passwordSuccess').classList.add('hidden');

            try {
                const response = await fetch('/api/profile/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                        confirmPassword
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    document.getElementById('passwordSuccess').textContent = data.message;
                    document.getElementById('passwordSuccess').classList.remove('hidden');
                    
                    // Limpar formulário
                    document.getElementById('currentPassword').value = '';
                    document.getElementById('newPassword').value = '';
                    document.getElementById('confirmPassword').value = '';

                    // Redirecionar para login após 3 segundos
                    setTimeout(() => {
                        alert('Senha alterada com sucesso! Faça login novamente.');
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }, 3000);
                } else {
                    document.getElementById('passwordError').textContent = data.error;
                    document.getElementById('passwordError').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error changing password:', error);
                document.getElementById('passwordError').textContent = 'Erro ao alterar senha';
                document.getElementById('passwordError').classList.remove('hidden');
            }
        }

        // Carregar atividades
        async function loadActivities() {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('/api/profile/activity', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                const data = await response.json();
                const activityList = document.getElementById('activityList');

                if (data.activities && data.activities.length > 0) {
                    activityList.innerHTML = data.activities.map(activity => {
                        const date = new Date(activity.created_at).toLocaleString('pt-BR');
                        const icon = getActivityIcon(activity.activity_type);
                        const label = getActivityLabel(activity.activity_type);
                        
                        return \`
                            <div class="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                                <i class="fas \${icon} text-purple-400"></i>
                                <div class="flex-1">
                                    <div class="text-sm font-medium">\${label}</div>
                                    <div class="text-xs text-gray-500">\${date}</div>
                                </div>
                            </div>
                        \`;
                    }).join('');
                } else {
                    activityList.innerHTML = '<div class="text-gray-400">Nenhuma atividade registrada</div>';
                }
            } catch (error) {
                console.error('Error loading activities:', error);
            }
        }

        function getActivityIcon(type) {
            const icons = {
                'login': 'fa-sign-in-alt',
                'password_changed': 'fa-key',
                'profile_updated': 'fa-user-edit',
                'prompt_viewed': 'fa-eye',
                'tool_viewed': 'fa-tools'
            };
            return icons[type] || 'fa-circle';
        }

        function getActivityLabel(type) {
            const labels = {
                'login': 'Login realizado',
                'password_changed': 'Senha alterada',
                'profile_updated': 'Perfil atualizado',
                'prompt_viewed': 'Prompt visualizado',
                'tool_viewed': 'Ferramenta visualizada'
            };
            return labels[type] || type;
        }

        // Alternar visibilidade da senha
        function togglePassword(fieldId) {
            const field = document.getElementById(fieldId);
            const icon = event.target;
            
            if (field.type === 'password') {
                field.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                field.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Mostrar seção
        function showSection(section) {
            // Esconder todas as seções
            document.querySelectorAll('.section-content').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Remover classe ativa de todos os botões
            document.querySelectorAll('.section-btn').forEach(btn => {
                btn.classList.remove('bg-white/10');
            });
            
            // Mostrar seção selecionada
            document.getElementById(section + '-section').classList.remove('hidden');
            
            // Adicionar classe ativa ao botão
            document.querySelector('[data-section="' + section + '"]').classList.add('bg-white/10');
            
            // Carregar dados específicos da seção
            if (section === 'activity') {
                loadActivities();
            }
        }

        // Logout
        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/';
        }

        // Carregar ao iniciar
        window.onload = function() {
            loadProfile();
            showSection('info');
        };
    </script>
</body>
</html>
`;

export default function profilePage(c: any) {
  return c.html(profileHTML);
}