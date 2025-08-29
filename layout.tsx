import './globals.css'
export const metadata = { title: 'Martech Master', description: 'Comunidade premium de Martech' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="pt-BR"><body><main className="max-w-7xl mx-auto px-6 py-8">{children}</main></body></html>)
}
