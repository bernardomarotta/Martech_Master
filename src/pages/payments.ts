export default function paymentsPage(c: any) {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagamentos - Martech Master</title>
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
            <h1 class="text-3xl font-bold text-gray-900">Pagamentos</h1>
            <p class="text-gray-600 mt-2">Gerencie suas transações e assinaturas</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <i class="fas fa-dollar-sign text-green-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Receita Total</p>
                        <p class="text-2xl font-bold">R$ 45.320</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <i class="fas fa-chart-line text-blue-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Este Mês</p>
                        <p class="text-2xl font-bold">R$ 8.540</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <i class="fas fa-credit-card text-purple-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Transações</p>
                        <p class="text-2xl font-bold">156</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <i class="fas fa-users text-yellow-600"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 text-sm">Assinantes</p>
                        <p class="text-2xl font-bold">42</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Upgrade para Premium</h2>
                    <p class="opacity-90">Desbloqueie recursos avançados e suporte prioritário</p>
                </div>
                <button onclick="upgradePlan()" class="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                    Fazer Upgrade
                </button>
            </div>
        </div>

        <!-- Transactions Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-6 py-4 border-b">
                <h2 class="text-xl font-bold">Histórico de Transações</h2>
            </div>
            <table class="min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descrição
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody id="paymentsTableBody" class="bg-white divide-y divide-gray-200">
                    <!-- Sample transactions -->
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #PAY-2024-001
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Assinatura Premium - Mensal
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            R$ 197,00
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Pago
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            15/01/2024
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button class="text-blue-600 hover:text-blue-900 mr-3">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="text-gray-600 hover:text-gray-900">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #PAY-2023-089
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Curso Growth Hacking
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            R$ 497,00
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Pago
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            20/12/2023
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button class="text-blue-600 hover:text-blue-900 mr-3">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="text-gray-600 hover:text-gray-900">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Payment Methods -->
        <div class="mt-8 bg-white rounded-lg p-6 shadow">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Métodos de Pagamento</h2>
                <button onclick="addPaymentMethod()" class="text-blue-600 hover:text-blue-700">
                    <i class="fas fa-plus mr-2"></i>Adicionar Método
                </button>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center justify-between p-4 border rounded-lg">
                    <div class="flex items-center">
                        <div class="bg-blue-100 p-3 rounded-lg mr-4">
                            <i class="fab fa-cc-visa text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="font-medium">Visa terminado em 4242</p>
                            <p class="text-sm text-gray-500">Expira 12/2025</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Principal</span>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                
                <div class="flex items-center justify-between p-4 border rounded-lg">
                    <div class="flex items-center">
                        <div class="bg-purple-100 p-3 rounded-lg mr-4">
                            <i class="fab fa-cc-mastercard text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <p class="font-medium">Mastercard terminado em 5555</p>
                            <p class="text-sm text-gray-500">Expira 08/2024</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }

        // Load payments on page load
        loadPayments();

        async function loadPayments() {
            try {
                const response = await fetch('/api/payments/history', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                
                const data = await response.json();
                
                if (data.success && data.payments) {
                    displayPayments(data.payments);
                }
            } catch (error) {
                console.error('Error loading payments:', error);
            }
        }

        function displayPayments(payments) {
            // Implementation for displaying payments
            console.log('Payments loaded:', payments);
        }

        function upgradePlan() {
            alert('Funcionalidade de upgrade em desenvolvimento');
        }

        function addPaymentMethod() {
            alert('Funcionalidade de adicionar método de pagamento em desenvolvimento');
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