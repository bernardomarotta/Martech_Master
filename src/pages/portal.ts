export default function portalPage(c: any) {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal - Martech Master</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <i class="fas fa-rocket text-pink-600 text-2xl mr-3"></i>
                    <span class="font-bold text-xl">Martech Master</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span id="userName" class="text-gray-700"></span>
                    <button onclick="logout()" class="text-gray-600 hover:text-red-600">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Welcome Section -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
            <h1 class="text-3xl font-bold mb-2">Bem-vindo ao Portal Martech Master</h1>
            <p class="text-xl opacity-90" id="welcomeMessage">Carregando...</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Campanhas Ativas</p>
                        <p class="text-2xl font-bold">12</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <i class="fas fa-users text-green-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Leads Totais</p>
                        <p class="text-2xl font-bold">3,452</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <i class="fas fa-percentage text-purple-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Taxa de Conversão</p>
                        <p class="text-2xl font-bold">4.8%</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <i class="fas fa-trophy text-yellow-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Pontos</p>
                        <p class="text-2xl font-bold">1,250</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Actions Grid -->
        <div class="grid md:grid-cols-3 gap-6">
            <!-- Profile Card -->
            <a href="/profile" class="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div class="flex items-center mb-4">
                    <div class="bg-indigo-100 p-3 rounded-lg">
                        <i class="fas fa-user text-indigo-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold ml-4">Meu Perfil</h2>
                </div>
                <p class="text-gray-600">Gerencie suas informações pessoais e configurações da conta</p>
                <div class="mt-4 text-indigo-600 font-medium">
                    Acessar <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </a>

            <!-- Members Card -->
            <a href="/members" class="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div class="flex items-center mb-4">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <i class="fas fa-users text-green-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold ml-4">Membros</h2>
                </div>
                <p class="text-gray-600">Visualize e gerencie todos os membros da plataforma</p>
                <div class="mt-4 text-green-600 font-medium">
                    Acessar <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </a>

            <!-- Payments Card -->
            <a href="/payments" class="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div class="flex items-center mb-4">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <i class="fas fa-credit-card text-purple-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold ml-4">Pagamentos</h2>
                </div>
                <p class="text-gray-600">Histórico de transações e gerenciamento financeiro</p>
                <div class="mt-4 text-purple-600 font-medium">
                    Acessar <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </a>

            <!-- Analytics Card -->
            <div class="bg-white rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
                <div class="flex items-center mb-4">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <i class="fas fa-chart-bar text-blue-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold ml-4">Analytics</h2>
                </div>
                <p class="text-gray-600">Dashboards e métricas de performance em tempo real</p>
                <div class="mt-4 text-blue-600 font-medium">
                    Em breve <i class="fas fa-clock ml-2"></i>
                </div>
            </div>

            <!-- Courses Card -->
            <div class="bg-white rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
                <div class="flex items-center mb-4">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <i class="fas fa-graduation-cap text-yellow-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold ml-4">Cursos</h2>
                </div>
                <p class="text-gray-600">Acesse conteúdos exclusivos e certificações</p>
                <div class="mt-4 text-yellow-600 font-medium">
                    Em breve <i class="fas fa-clock ml-2"></i>
                </div>
            </div>

            <!-- Tools Card -->
            <div class="bg-white rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
                <div class="flex items-center mb-4">
                    <div class="bg-red-100 p-3 rounded-lg">
                        <i class="fas fa-tools text-red-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold ml-4">Ferramentas</h2>
                </div>
                <p class="text-gray-600">Kit completo de ferramentas de marketing digital</p>
                <div class="mt-4 text-red-600 font-medium">
                    Em breve <i class="fas fa-clock ml-2"></i>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="mt-8 bg-white rounded-lg p-6 shadow">
            <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
            <div class="space-y-3">
                <div class="flex items-center py-3 border-b">
                    <div class="bg-blue-100 p-2 rounded-lg">
                        <i class="fas fa-user-plus text-blue-600"></i>
                    </div>
                    <div class="ml-4 flex-1">
                        <p class="font-medium">Novo membro cadastrado</p>
                        <p class="text-sm text-gray-500">João Silva se juntou à plataforma</p>
                    </div>
                    <span class="text-sm text-gray-400">2 horas atrás</span>
                </div>
                
                <div class="flex items-center py-3 border-b">
                    <div class="bg-green-100 p-2 rounded-lg">
                        <i class="fas fa-chart-line text-green-600"></i>
                    </div>
                    <div class="ml-4 flex-1">
                        <p class="font-medium">Meta atingida</p>
                        <p class="text-sm text-gray-500">Campanha de email alcançou 10K opens</p>
                    </div>
                    <span class="text-sm text-gray-400">5 horas atrás</span>
                </div>
                
                <div class="flex items-center py-3">
                    <div class="bg-purple-100 p-2 rounded-lg">
                        <i class="fas fa-graduation-cap text-purple-600"></i>
                    </div>
                    <div class="ml-4 flex-1">
                        <p class="font-medium">Novo curso disponível</p>
                        <p class="text-sm text-gray-500">Growth Hacking Avançado foi lançado</p>
                    </div>
                    <span class="text-sm text-gray-400">1 dia atrás</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Check authentication
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!token) {
            window.location.href = '/login';
        }

        // Display user info
        document.getElementById('userName').textContent = user.name || 'Usuário';
        document.getElementById('welcomeMessage').textContent = 
            'Olá ' + (user.name || 'Usuário') + ', é ótimo ter você de volta!';

        // Logout function
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    </script>
</body>
</html>
  `)
}