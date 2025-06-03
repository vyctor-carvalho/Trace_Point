import { blueBright, magentaBright, greenBright, yellowBright, redBright } from 'colorette';

/**
 * @file customLogger.ts
 * @description Utilitário de logger customizado com formatação de timestamp, níveis de log e cores.
 * Exporta um objeto `logger` com métodos para cada nível de log (info, warn, error, debug).
 */

/**
 * @type LogLevel
 * @description Define os possíveis níveis de severidade para as mensagens de log.
 * Utilizado para determinar a formatação e a cor da saída do log.
 */
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * @function customLogger
 * @private
 * @description Função interna que formata e exibe uma mensagem de log no console.
 * Inclui um timestamp formatado, o nível do log com uma cor específica, e a mensagem fornecida.
 * Esta função não é exportada diretamente, mas é utilizada pelos métodos do objeto `logger`.
 *
 * @param {LogLevel} level - O nível de severidade do log (ex: 'info', 'warn', 'error', 'debug').
 * @param {string} message - A mensagem string a ser logada.
 * @returns {void}
 */
function customLogger(level: LogLevel, message: string): void {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timestamp = greenBright(`${hours}:${minutes}:${seconds}`); // Timestamp em verde

  let levelOutput: string;

  // Aplica cores e formatação ao prefixo do nível de log
  switch (level) {
    case 'info':
      levelOutput = blueBright(`INFO`); // Azul para info, com espaçamento para alinhar
      break;
    case 'warn':
      levelOutput = yellowBright(`WARN`); // Amarelo para warn
      break;
    case 'error':
      levelOutput = redBright(`ERROR`); // Vermelho para error
      break;
    case 'debug':
      levelOutput = magentaBright(`DEBUG`); // Magenta para debug
      break;
  }
  console.log(`[${levelOutput}] ${timestamp} ${message}`);
}

/**
 * @constant logger
 * @description Objeto exportado que fornece métodos de logging para diferentes níveis de severidade.
 * Cada método utiliza a função `customLogger` interna para formatar e exibir a mensagem.
 * * @property {function(message: string): void} info - Loga uma mensagem com o nível 'info'.
 * @property {function(message: string): void} warn - Loga uma mensagem com o nível 'warn'.
 * @property {function(message: string): void} error - Loga uma mensagem com o nível 'error'.
 * @property {function(message: string): void} debug - Loga uma mensagem com o nível 'debug'.
 */
export const logger = {
  /**
   * @method logger.info
   * @description Loga uma mensagem informativa.
   * As mensagens 'info' são geralmente usadas para rastrear o fluxo normal da aplicação.
   *
   * @param {string} message - A mensagem a ser logada.
   * @returns {void}
   */
  info: (message: string): void => customLogger('info', message),

  /**
   * @method logger.warn
   * @description Loga uma mensagem de aviso (warning).
   * As mensagens 'warn' indicam uma situação potencialmente problemática que não é crítica.
   *
   * @param {string} message - A mensagem a ser logada.
   * @returns {void}
   */
  warn: (message: string): void => customLogger('warn', message),

  /**
   * @method logger.error
   * @description Loga uma mensagem de erro.
   * As mensagens 'error' indicam falhas ou condições de erro que podem afetar a funcionalidade.
   *
   * @param {string} message - A mensagem a ser logada.
   * @returns {void}
   */
  error: (message: string): void => customLogger('error', message),

  /**
   * @method logger.debug
   * @description Loga uma mensagem de depuração (debug).
   * As mensagens 'debug' são usadas para informações detalhadas úteis durante o desenvolvimento e depuração.
   *
   * @param {string} message - A mensagem a ser logada.
   * @returns {void}
   */
  debug: (message: string): void => customLogger('debug', message),
};