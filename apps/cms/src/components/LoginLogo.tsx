import * as React from 'react'

// Updated: 2025-11-16 16:30 - Logo display fix
export const LoginLogo = () => (
  <>
    {/* CSS inline para esconder Welcome e subtítulo */}
    <style>{`
      /* Esconder textos padrão do Payload */
      .template-minimal__wrap > h1,
      .template-minimal h1 {
        display: none !important;
      }

      .template-minimal__wrap > p,
      .template-minimal p:not(.login-logo-subtitle) {
        display: none !important;
      }

      /* Garantir que selects sejam brancos */
      select {
        background-color: #ffffff !important;
        background: #ffffff !important;
        color: #4A4A4A !important;
        border: 2px solid #E3DFEE !important;
      }
    `}</style>

    <div
      className="login-logo-container"
      style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        marginTop: '0',
        paddingTop: '0'
      }}
    >
      <div style={{
        marginBottom: '0.75rem'
      }}>
        <img
          src="/logo.png"
          alt="Nutrindo Juntos"
          style={{
            width: 'auto',
            height: '100px',
            maxWidth: '100%',
            filter: 'drop-shadow(0 4px 16px rgba(109, 77, 136, 0.15))',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>
      <p
        className="login-logo-subtitle"
        style={{
          color: '#737373',
          fontSize: '0.875rem',
          margin: 0,
          fontWeight: '500',
          letterSpacing: '0.05em',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        Content Management System
      </p>
    </div>
  </>
)

export default LoginLogo
