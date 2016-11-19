import B from './B'

export default class A {
    static inject = ['B']

    public name = 'aaa'

    onInject(b: B) {
        console.log('A inject B instance', b.name)
    }
}