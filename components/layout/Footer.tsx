'use client'

interface FooterProps {
  isDarkMode?: boolean
}

export default function Footer({ isDarkMode = false }: FooterProps) {
  return (
    <footer className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} border-t ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-12`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8`}>
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-[#dc2626] font-bold text-xl">Vehicles</span>
            </div>
            <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm`}>
              Plataforma de classificados para compra e venda de veículos usados
            </p>
          </div>
          <div>
            <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-4`}>Categorias</h3>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
              <li><a href="#" className="hover:text-[#dc2626]">Carros</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Motos</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Caminhões</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Ônibus</a></li>
            </ul>
          </div>
          <div>
            <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-4`}>Institucional</h3>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
              <li><a href="#" className="hover:text-[#dc2626]">Quem Somos</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Blog</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Contato</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Trabalhe Conosco</a></li>
            </ul>
          </div>
          <div>
            <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-4`}>Políticas</h3>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
              <li><a href="#" className="hover:text-[#dc2626]">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#dc2626]">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className={`border-t ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} pt-8 text-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm`}>
          <p>© 2025 Vehicles. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
