import * as React from 'react'

export const Logo = () => (
  <div style={{ padding: '1rem', textAlign: 'center' }}>
    <img
      src="/logo.png"
      alt="Nutrindo Juntos"
      style={{
        width: 'auto',
        height: '60px',
        maxWidth: '100%',
        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
      }}
    />
  </div>
)

export default Logo
