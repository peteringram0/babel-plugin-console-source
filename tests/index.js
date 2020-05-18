import Test from './test'

class App {

    constructor() {

        Test.a()
        console.log('Testing');

        this.main();
    }

    main() {

        console.log('testing 1234');

    }

}

export default new App()
