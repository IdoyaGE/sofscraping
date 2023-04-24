/**

@fileoverview Script que contiene pruebas para la clase Scraper.
@author [autor]
@requires ../../utils/scraper.js
@requires Jest
@see https://jestjs.io/docs/en/getting-started
*/


import Scraper from "../../utils/scraper.js";

/**

Descripción general de los test para la clase Scraper.

@class
*/

//Parser en MAY porque es una clase
describe('Scraper', () => {
    let scraper;

/**

Configuración inicial para cada uno de los test.
Inicializa el objeto Scraper y espera a que esté listo para su uso, asíncrono tiene que hacer el init
*/
    beforeAll(async () => {
        scraper =new Scraper();
        await scraper.init();
        });
/**

Finaliza la ejecución del test y cierra el objeto Scraper.
*/
    afterAll(async () => {
        await scraper.close();
    });

/**

Test que obtiene el contenido de una página web.
*/
    it("Debería obtener el contenido de una página", async() => {
        const url ="https://www.google.com";
        const content = await scraper.getPageContent(url);
        expect(content).toContain("<title>Google</title>");
    });


});