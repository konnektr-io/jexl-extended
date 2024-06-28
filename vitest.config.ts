import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: [
      'test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ]
  },
  plugins: [
    tsconfigPaths({
      // This is needed to avoid Vitest picking up tsconfig.json files from other unrelated projects in the monorepo
      ignoreConfigErrors: true
    })
  ]
})
