export default function membersPage(c: any) {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Membros - Martech Master</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/portal" class="flex items-center">
                        <i class="fas fa-rocket text-pink-600 text-2xl mr-3"></i>
                        <span class="font-bold text-xl">Martech Master</span>
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/profile" class="text-gray-600 hover:text-gray-900">
                        <i class="fas fa-user"></i>
                    </a>
                    <button onclick="logout()" class="text-gray-600 hover:text-red-600">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Gerenciar Membros</h1>
            <p class="text-gray-600 mt-2">Visualize e gerencie todos os membros da plataforma</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <i class="fas fa-users text-blue-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Total de Membros</p>
                        <p class="text-2xl font-bold" id="totalMembers">0</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <i class="fas fa-user-check text-green-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Ativos</p>
                        <p class="text-2xl font-bold" id="activeMembers">0</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <i class="fas fa-crown text-purple-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Premium</p>
                        <p class="text-2xl font-bold" id="premiumMembers">0</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <i class="fas fa-user-plus text-yellow-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Novos (30 dias)</p>
                        <p class="text-2xl font-bold" id="newMembers">0</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white rounded-lg p-6 shadow mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <div class="relative">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Buscar por nome ou email..."
                            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        >
                        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                    </div>
                </div>
                <select id="filterStatus" class="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="all">Todos os Status</option>
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                    <option value="suspended">Suspenso</option>
                </select>
                <select id="filterType" class="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="all">Todos os Planos</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                </select>
                <button onclick="addMember()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <i class="fas fa-plus mr-2"></i>Adicionar Membro
                </button>
            </div>
        </div>

        <!-- Members Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Membro
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plano
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cadastro
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody id="membersTableBody" class="bg-white divide-y divide-gray-200">
                    <!-- Members will be loaded here -->
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-6 flex justify-between items-center">
            <p class="text-sm text-gray-700">
                Mostrando <span id="showingCount">0</span> de <span id="totalCount">0</span> membros
            </p>
            <div class="flex gap-2">
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-50">Anterior</button>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-50">Próximo</button>
            </div>
        </div>
    </div>

    <script>
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }

        // Load members on page load
        loadMembers();

        async function loadMembers() {
            try {
                const response = await fetch('/api/members', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    displayMembers(data.members || []);
                    updateStats(data.members || []);
                }
            } catch (error) {
                console.error('Error loading members:', error);
            }
        }

        function displayMembers(members) {
            const tbody = document.getElementById('membersTableBody');
            
            if (members.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">Nenhum membro encontrado</td></tr>';
                return;
            }
            
            tbody.innerHTML = members.map(member => \`
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                    \${member.name ? member.name.charAt(0).toUpperCase() : '?'}
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">\${member.name || 'Nome não informado'}</div>
                                <div class="text-sm text-gray-500">\${member.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            \${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                            \${member.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        \${member.subscription_type || 'Basic'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        \${new Date(member.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="viewMember(\${member.id})" class="text-indigo-600 hover:text-indigo-900 mr-3">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editMember(\${member.id})" class="text-blue-600 hover:text-blue-900 mr-3">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteMember(\${member.id})" class="text-red-600 hover:text-red-900">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            \`).join('');
            
            document.getElementById('showingCount').textContent = members.length;
            document.getElementById('totalCount').textContent = members.length;
        }

        function updateStats(members) {
            document.getElementById('totalMembers').textContent = members.length;
            document.getElementById('activeMembers').textContent = 
                members.filter(m => m.status === 'active').length;
            document.getElementById('premiumMembers').textContent = 
                members.filter(m => m.subscription_type === 'premium').length;
            
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            document.getElementById('newMembers').textContent = 
                members.filter(m => new Date(m.created_at) > thirtyDaysAgo).length;
        }

        function viewMember(id) {
            // Implement view member details
            console.log('View member:', id);
        }

        function editMember(id) {
            // Implement edit member
            console.log('Edit member:', id);
        }

        function deleteMember(id) {
            if (confirm('Tem certeza que deseja remover este membro?')) {
                // Implement delete member
                console.log('Delete member:', id);
            }
        }

        function addMember() {
            // Implement add member
            console.log('Add new member');
        }

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