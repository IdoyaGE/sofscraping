// Importamos la biblioteca Puppeteer
import puppeteer from "puppeteer";

/**
 * Clase Scraper
 * 
 * @class
 * @classdesc Clase para hacer scrapping con Puppeteer
 */
class Scraper {
    constructor() {
        // Establecemos las propiedades browser y page como nulas por defecto
        this.browser = null;
        this.page = null;
    }

    /**
     * Inicializa Puppeteer y abre una nueva página
     * 
     * @async
     * @function init
     * @memberof Scraper
     * @returns {Promise<void>}
     */
    async init() {
        // Inicializa una instancia de Puppeteer (para que no de problemas por estar en docker)
        this.browser = await puppeteer.launch({
            headless:true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        // Crea una nueva página en el navegador
        this.page = await this.browser.newPage();
    }

    /**
     * Accede a una URL y devuelve el contenido de la página
     * 
     * @async
     * @function getPageContent
     * @memberof Scraper
     * @param {string} url - La URL de la página
     * @returns {Promise<string>} - El contenido de la página en formato de cadena
     */
    async getPageContent(url) {
        // Accede a la URL especificada
        await this.page.goto(url);
        // Devuelve el contenido de la página
        return await this.page.content();
    }

    /**
     * Cierra la instancia de Puppeteer
     * 
     * @async
     * @function close
     * @memberof Scraper
     * @returns {Promise<string>}
     */
    async close() {
        // Cierra el navegador
        await this.browser.close();
    }
}

// Exporta la clase Scraper para su uso en otros archivos
export default Scraper;
