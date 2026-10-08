import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  {
    // Local WebP assets carry explicit srcset and sizes; a runtime image optimizer is unnecessary.
    rules: { '@next/next/no-img-element': 'off' },
  },
]

export default eslintConfig
