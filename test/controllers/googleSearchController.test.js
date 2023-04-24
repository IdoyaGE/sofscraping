/**
 * Controller para buscar en Google.
 * @typedef {Object} googleSearchController
 * @property {Function} searchLinks - Función asíncrona para buscar links a partir de una búsqueda en Google y que encuentre la página web de Stackoverflow en español.
 */

import googleSearchController from "../../controllers/googleSearchController";

describe("Google Search controller", () => {

    /**
     * Test para verificar si se pueden obtener los links de una búsqueda en Google.
     * @async
     * @function it
     * @memberof googleSearchController
     * @param {string} query - La cadena de búsqueda para buscar los links.
     * @returns {Promise} -devuelve los links correctos utilizando en método toContain
     */
    it("Debería conseguir los links de una búsqueda de Google", async() => {
        const query = "stackoverflow";
        const links = await googleSearchController.searchLinks(query);
        expect(links).toContain("https://es.stackoverflow.com");
    },10000) 
})
