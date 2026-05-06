import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			// NUTRINDO JUNTOS Brand Colors (from Manual da Marca)
  			primary: {
  				'50': '#e6f9fa',
  				'100': '#ccf3f5',
  				'200': '#99e7eb',
  				'300': '#66dbe0',
  				'400': '#33cfd6',
  				'500': '#19c5ca',  // Verde Água (Teal) - Main brand color
  				'600': '#149ea2',
  				'700': '#0f767a',
  				'800': '#0a4f51',
  				'900': '#052729',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f3f0f7',
  				'100': '#e7e1ef',
  				'200': '#cfc3df',
  				'300': '#b7a5cf',
  				'400': '#9f87bf',
  				'500': '#6d4d88',  // Roxo Lavanda (Lavender Purple) - Secondary
  				'600': '#573d6d',
  				'700': '#412e52',
  				'800': '#2b1e37',
  				'900': '#160f1b',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			// Brand supporting colors
  			graphite: {
  				DEFAULT: '#4A4A4A',  // Grafite Suave - Professionalism
  			},
  			lavender: {
  				DEFAULT: '#E3DFEE',  // Lavanda Suave - Subtle elegance
  			},
  			// Figma Design System Colors (fistudy adaptation)
  			'figma-blue': {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#687eff',   // From Figma gradient
  				'500': '#3c59fc',   // From Figma gradient
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  			},
  			'figma-orange': {
  				'50': '#fff7ed',
  				'100': '#ffedd5',
  				'200': '#fed7aa',
  				'300': '#fdba74',
  				'400': '#ff7163',   // From Figma newsletter gradient
  				'500': '#ff4330',   // From Figma newsletter gradient
  				'600': '#ea580c',
  				'700': '#c2410c',
  				'800': '#9a3412',
  				'900': '#7c2d12',
  			},
  			'figma-yellow': {
  				'50': '#fefce8',
  				'100': '#fef9c3',
  				'200': '#fffcee',   // From Figma team gradient
  				'300': '#fde047',
  				'400': '#facc15',
  				'500': '#eab308',
  				'600': '#ca8a04',
  				'700': '#a16207',
  				'800': '#854d0e',
  				'900': '#713f12',
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			'none': '0',
  			'sm': '0.25rem',   // 4px
  			'DEFAULT': '0.5rem', // 8px - Suave, orgânico
  			'md': '0.75rem',   // 12px
  			'lg': '1rem',      // 16px
  			'xl': '1.5rem',    // 24px
  			'2xl': '2rem',     // 32px
  			'full': '9999px',
  		},
  		fontFamily: {
  			// NUTRINDO JUNTOS Brand Fonts (from Manual da Marca)
  			// Poppins = Fonte PRINCIPAL (todo o corpo de texto)
  			// Playfair Display = Fonte SECUNDÁRIA (títulos e destaques)
  			sans: [
  				'var(--font-poppins)',
  				'system-ui',
  				'sans-serif'
  			],  // Poppins - PRINCIPAL: Corpo de texto, UI, navegação
  			display: [
  				'var(--font-playfair)',
  				'Georgia',
  				'serif'
  			],  // Playfair Display - SECUNDÁRIA: Títulos (h1, h2, h3)
  			serif: [
  				'var(--font-playfair)',
  				'Georgia',
  				'serif'
  			],  // Alias para Playfair Display
  			outfit: [
  				'var(--font-outfit)',
  				'system-ui',
  				'sans-serif'
  			],  // Outfit - Opcional (pode ser removido depois)
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-20px)' },
  			},
  			'float-delayed': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-15px)' },
  			},
  			'float-slow': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' },
  			},
  			'marquee': {
  				'0%': { transform: 'translateX(0%)' },
  				'100%': { transform: 'translateX(-50%)' },
  			},
  			'bounce-slow': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-15px)' },
  			},
  			'float-bob-x': {
  				'0%, 100%': { transform: 'translateX(0)' },
  				'50%': { transform: 'translateX(20px)' },
  			},
  			'float-bob-y': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-20px)' },
  			},
  			'rotate-slow': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' },
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'float': 'float 3s ease-in-out infinite',
  			'float-delayed': 'float-delayed 4s ease-in-out infinite 1s',
  			'float-slow': 'float-slow 5s ease-in-out infinite 2s',
  			'marquee': 'marquee 25s linear infinite',
  			'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
  			'float-bob-x': 'float-bob-x 3s ease-in-out infinite',
  			'float-bob-y': 'float-bob-y 4s ease-in-out infinite',
  			'rotate-slow': 'rotate-slow 20s linear infinite',
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: '65ch',
  					color: 'inherit',
  					a: {
  						color: '#19c5ca',  // Brand teal
  						'&:hover': {
  							color: '#149ea2'  // Darker teal
  						}
  					},
  					h1: {
  						fontFamily: 'var(--font-playfair), Georgia, serif',
  						fontWeight: '700'
  					},
  					h2: {
  						fontFamily: 'var(--font-playfair), Georgia, serif',
  						fontWeight: '700'
  					},
  					h3: {
  						fontFamily: 'var(--font-playfair), Georgia, serif',
  						fontWeight: '600'
  					},
  					h4: {
  						fontFamily: 'var(--font-poppins), system-ui, sans-serif',
  						fontWeight: '600'
  					},
  					'code::before': {
  						content: '"'
  					},
  					'code::after': {
  						content: '"'
  					}
  				}
  			}
  		},
  		// Figma-inspired background gradients
  		backgroundImage: {
  			'gradient-hero': 'linear-gradient(180deg, #3c59fc 0%, #687eff 100%)',
  			'gradient-category': 'linear-gradient(180deg, #3c59fc 0%, #687eff 100%)',
  			'gradient-counter': 'linear-gradient(90deg, #687eff 0%, #5770ff 100%)',
  			'gradient-course': 'linear-gradient(225deg, #fffbf5 0%, #faedfff 100%)',
  			'gradient-team': 'linear-gradient(180deg, #ffffff 0%, #fffcee 49%, #ffffff 100%)',
  			'gradient-newsletter': 'linear-gradient(90deg, #ff4330 0%, #ff7163 100%)',
  			// Brand gradients (usando cores da marca)
  			'gradient-primary': 'linear-gradient(180deg, #19c5ca 0%, #149ea2 100%)',
  			'gradient-secondary': 'linear-gradient(180deg, #6d4d88 0%, #573d6d 100%)',
  		}
  	}
  },
  plugins: [
    require('tailwindcss-animate'),
    // require('@tailwindcss/typography'), // BUG: Minificação quebra CSS em produção (Next.js 15 + typography v0.5.19)
    require('@tailwindcss/forms'),
  ],
}

export default config
