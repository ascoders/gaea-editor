import A from './A'

export default class B {
    static inject = ['A']

    public name = 'bbb'

    onInject(a: A) {
        console.log('B inject A instance', a.name)
    }
}