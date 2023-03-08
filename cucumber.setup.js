// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
require('ts-node').register({
    transpileOnly: true,
    require: ['tsconfig-paths/register'],
    compilerOptions: {
        module: 'commonjs',
        resolveJsonModule: true,
        baseUrl: '.',
        paths: {
            "@infra/*": ["src/infra/*"],
            "@domain/*": ["src/domain/*"],
            "@shared/*": ["src/shared/*"]
        },
    },
});
