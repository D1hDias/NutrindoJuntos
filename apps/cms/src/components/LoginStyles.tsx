import * as React from 'react'

export const LoginStyles = () => {
  React.useEffect(() => {
    // Function to apply purple background to filled inputs
    const applyInputStyles = () => {
      const inputs = document.querySelectorAll<HTMLInputElement>(
        '.template-default--login input[type="email"], .template-default--login input[type="password"]'
      )

      inputs.forEach((input) => {
        const updateStyle = () => {
          if (input.value && input.value.trim() !== '') {
            // Input has value - apply purple background
            input.style.setProperty('background-color', '#6d4d88', 'important')
            input.style.setProperty('background', '#6d4d88', 'important')
            input.style.setProperty('color', '#ffffff', 'important')
            input.style.setProperty('border-color', '#573d6d', 'important')
          } else {
            // Input is empty - apply white background
            input.style.setProperty('background-color', '#ffffff', 'important')
            input.style.setProperty('background', '#ffffff', 'important')
            input.style.setProperty('color', '#4A4A4A', 'important')
            input.style.setProperty('border-color', '#E3DFEE', 'important')
          }
        }

        // Initial style application
        updateStyle()

        // Listen to various events
        input.addEventListener('input', updateStyle)
        input.addEventListener('change', updateStyle)
        input.addEventListener('blur', updateStyle)
        input.addEventListener('focus', updateStyle)
      })
    }

    // Initial application
    applyInputStyles()

    // Re-apply after a short delay (in case Payload loads async)
    const timer = setTimeout(applyInputStyles, 500)

    // Observe DOM changes and re-apply styles
    const observer = new MutationObserver(applyInputStyles)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return null
}

export default LoginStyles
