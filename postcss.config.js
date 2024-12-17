import cssnano from 'cssnano'
import presetEnv from 'postcss-preset-env'

export default {
    plugins: [
        // Preset Env
        presetEnv({
            stage: 3,
        }),

        // CSS Nano
        !process.env.DEV && cssnano({
            preset: ['default', {
                autoprefixer: true,
                discardComments: { removeAll: true },
                calc: { precision: 2 },
                safe: true
            }]
        }),
    ]
}
