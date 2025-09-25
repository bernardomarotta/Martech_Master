export default function landingPage(c: any) {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Martech Master - Domine o Marketing Digital</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-black/30 backdrop-blur-md fixed w-full z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center">
                    <i class="fas fa-rocket text-pink-500 text-2xl mr-3"></i>
                    <span class="text-white font-bold text-xl">Martech Master</span>
                </div>
                <div class="flex space-x-4">
                    <a href="/login" class="text-white hover:text-pink-400 transition">Login</a>
                    <a href="/login" class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition">
                        Começar Agora
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4">
        <div class="max-w-7xl mx-auto text-center">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
                Domine o <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Marketing Digital</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Transforme sua carreira com as estratégias mais avançadas de Martech, Growth e Performance Digital
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/login" class="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105">
                    <i class="fas fa-rocket mr-2"></i>
                    Acessar Plataforma
                </a>
                <button onclick="scrollToFeatures()" class="border border-white/30 hover:bg-white/10 text-white text-lg px-8 py-4 rounded-lg transition">
                    <i class="fas fa-play-circle mr-2"></i>
                    Ver Demonstração
                </button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-4xl font-bold text-white text-center mb-12">
                Recursos da Plataforma
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
                    <div class="bg-pink-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-chart-line text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Analytics Avançado</h3>
                    <p class="text-gray-300">
                        Dashboards em tempo real com métricas essenciais para tomada de decisão
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
                    <div class="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-users text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Gestão de Leads</h3>
                    <p class="text-gray-300">
                        Sistema completo de CRM para nutrir e converter seus leads em clientes
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
                    <div class="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-robot text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Automação com IA</h3>
                    <p class="text-gray-300">
                        Automatize campanhas e personalize experiências com inteligência artificial
                    </p>
                </div>

                <!-- Feature 4 -->
                <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
                    <div class="bg-yellow-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-graduation-cap text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Cursos Exclusivos</h3>
                    <p class="text-gray-300">
                        Acesso a conteúdos premium e certificações em marketing digital
                    </p>
                </div>

                <!-- Feature 5 -->
                <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
                    <div class="bg-green-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-code text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Integrações</h3>
                    <p class="text-gray-300">
                        Conecte com as principais ferramentas do mercado via API
                    </p>
                </div>

                <!-- Feature 6 -->
                <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition">
                    <div class="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-headset text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Suporte Premium</h3>
                    <p class="text-gray-300">
                        Atendimento especializado e consultoria personalizada
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-12">
            <h2 class="text-4xl font-bold text-white mb-4">
                Pronto para revolucionar seu marketing?
            </h2>
            <p class="text-xl text-white/90 mb-8">
                Junte-se a milhares de profissionais que já transformaram suas estratégias
            </p>
            <a href="/login" class="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg transition transform hover:scale-105 inline-block font-bold">
                Acessar Agora <i class="fas fa-arrow-right ml-2"></i>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black/30 backdrop-blur-md py-8 px-4">
        <div class="max-w-7xl mx-auto text-center">
            <p class="text-gray-400">
                © 2024 Martech Master. Todos os direitos reservados.
            </p>
        </div>
    </footer>

    <script>
        function scrollToFeatures() {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        }
    </script>
</body>
</html>
  `)
}