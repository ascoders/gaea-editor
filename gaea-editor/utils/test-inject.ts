export const inject = (...injectSymbol: Array<any>) => (target: any) => {
    console.log('target', target, 'injectSymbol', injectSymbol)
}