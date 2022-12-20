import './commands';
import 'cypress-mochawesome-reporter/register';
import addContext from 'mochawesome/addContext';

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        addContext({ test }, `../videos/${Cypress.spec.name}.mp4`);
    }
});
