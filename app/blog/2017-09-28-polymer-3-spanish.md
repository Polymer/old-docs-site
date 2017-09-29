---
title:  "Preview de Polymer 3.0: npm y Módulos de ES6"
---

Cuando estuve en Cracovia para GDD Europe, encontré muchos desarrolladores que son hispanohablantes. Así que decidí traducir este artículo para compartir con más desarrolladores que, quizas, no hablan inglés. Muchas gracias a [Alberto Medina](https://twitter.com/iAlbMedina) y [Francisco Baena](https://twitter.com/baenans) por ayudarme. Sin ellos, no sé si mi español sería comprensible.

Hace unas semanas, en el Polymer Summit 2017 de Copenhagen  anunciamos uno de los cambios más importantes en nuestro flujo de trabajo para desarrolladores en toda la historia del proyecto. 
*   Polymer va a reemplazar Bower por npm.
*   Polymer va a reemplazar HTML Imports por módulos de ES6 

Hemos lanzado la versión “preview” con estos cambios-- los cuales serán incluídos en la siguiente versión principal-- para así poder recibir comentarios y continuar nuestro trabajo en público. Por favor, utiliza la versión “preview” únicamente para experimentar. Para proyectos en producción, sigue utilizando las versiones existentes (Polymer 1.x o 2.x) que estás utilizando hoy. 
 
Aunque estos cambios serán significativos, nos comprometemos a hacer la transición lo más fácil posible. La API de Polymer 3.0 será esencialmente idéntica a la de la versión 2.x. Si necesitamos hacer cambios, esperamos que sean muy pequeños y sencillos. Todas las clases, mixins, elementos, sistema de plantillas, y otras APIs que son parte de Polymer 2.x están ya siendo migradas a módulos ES6. Esta incluirá la sintaxis de Polymer 1.x Legacy.  Si ya sabes desarrollar con Polymer, todo el conocimiento que tienes es aplicable directamente a Polymer 3.0. 
 
Vamos a proporcionar también la herramienta Polymer Modulizer para automatizar la conversión de tus elementos y apps actuales a Polymer 3.0. Esta herramienta estará disponible inmediatamente con la preview y ya ha sido probada con Polymer y sus elementos.  
 
Este artículo describe nuestra motivación para realizar los cambios hacia Polymer 3.0 y los pasos necesarios antes de que lancemos la versión estable. También escribimos un artículo sobre cómo usar la “preview”. (Aunque esta no está disponible aún en español).

## ¿Por qué estamos migrando a NPM y módulos de ES6?

Desde los primeros días de Polymer, hemos utilizado Bower y HTML Imports para administrar las dependencias: Bower para instalarlas y HTML Imports para cargarlas. Estas tecnologías han funcionado muy bien si el flujo de trabajo se basa en HTML Imports, cómo es el caso de Polymer u otros Web Components que han seguido su ejemplo. Sin embargo, esto nos ha situado fuera de la corriente principal del desarrollo web, y esto dificulta el trabajo de aquellos que trabajan con otros frameworks o herramientas de compilación.
 
Por otro lado, la migración a módulos de ES6 y npm tiene varias ventajas:



*   Polymer se vuelve más compatible con el flujo de trabajo y las herramientas que son familiares para un gran número de desarrolladores de JavaScript.
*   Los elementos y apps de Polymer funcionarán sin necesidad de polyfills en las versiones recientes de Chrome, Opera y Safari. Cuando Edge y Firefox implementen Custom Elements y Shadow DOM, Polymer también funcionará sin necesidad de polyfills en ningún navegador.
*   Podrás trabajar con otras librerías de JavaScript más fácilmente, tanto si las utilizas dentro de un elemento o importas un elemento de Polymer diréctamente.


Las siguientes secciones describen estos cambios con más detalles.


## HTML Imports ➙ Módulos de ES6

Desde el principio, Polymer ha utilizado HTML Imports para cargar las dependencias. Los HTML Imports tienen muchos beneficios:

*    Son un mecanismo de carga nativa; es decir, no hace falta utilizar herramientas de compilación para importar código utilizando HTML Imports. 
*    Son un mecanismo transitivo de carga de dependencias con evaluación ordenada; es decir, si A importa a B, y B importa a C, C y B son cargados y evaluados antes que A.
*    Deduplicación de dependencias mediante URL; es decir, cada import es descargado y evaluado sólo una vez, incluso en aquellas ocasiones donde se importa varias veces.
*    El parseo de HTML se realiza de manera nativa.

Sin embargo, HTML Imports no han sido acogidos complementamente por los comités de estandarización y otros navegadores. Hay discusiones activas sobre un esquema sucesor, pero cualquier nuevo estándar tomará años para ser adoptado.
 
Introducción a los módulos ES6. El estándar ECMAScript 2015 (también conocido como ECMAScript 6 o ES6) introdujo un módulo nativo y un sistema de carga de módulos para JavaScript, que finalmente está recibiendo soporte en los principales navegadores. Son compatibles con Safari, Chrome y detrás de flags en Firefox y Edge.
 
Los módulos ES6 permiten a los archivos JavaScript importar otros archivos, haciendo que sean cargados y ejecutados por el navegador. El comportamiento de carga de los módulos ES6 es casi idéntico a los HTML Imports. 

*   Son un mecanismo nativo de la web.
*   Carga transitiva de dependencias con evaluación ordenada.
*   Deduplicación de dependencias mediante la URL.

La característica de HTML Imports que evidentemente falta en los Módulos ES6 es la carga y el análisis nativo del código HTML importado. Nos gustaría que la plataforma adoptara esta capacidad de nuevo, pero mientras evolucionan las discusiones del estándar creemos que la adopción de los módulos ES6 es la mejor opción para satisfacer las necesidades de nuestros desarrolladores y sus usuarios.
 
Mientras tanto, hay una gama de opciones razonables para representar HTML en JavaScript, y esperamos explorar esas opciones con la comunidad.



## Bower ➙ npm

Al igual que los HTML Imports, también hemos utilizado Bower durante mucho tiempo. El árbol plano de dependencias de Bower es ideal para proyectos de front-end. Pero Bower nunca ha logrado una adopción tan extensa como npm, y aunque aún lo están manteniendo, ya no está siendo desarrollando activamente.
 
Migrar a npm hará que los paquetes de Polymer estén disponibles para los millones de usuarios con los que cuenta npm y permitirá que estos puedan utilizar más fácilmente otros paquetes del masivo ecosistema de npm.
 
Esta ha sido una característica muy solicitada, pero hemos estado esperando hasta que encontramos una buena solución para soportar instalaciones planas de módulos y poder mantener sincronizados los paquetes tanto de Bower como de npm.
 
El cliente npm de yarn proporciona soporte para instalaciones planas, lo que soluciona nuestro principal problema para utilizar npm.
 
Tras considerar muchas opciones para la sincronización de los paquetes de Bower y npm, nos dimos cuenta de que mantener versiones paralelas es poco práctico y concluimos que lo ideal es dejar de utilizar bower en la 3.x y usar npm exclusivamente.


## ¿Cuándo sucederá esto?

Ya puedes utilizar la versión nueva del Polymer y los elementos, pero aún necesitamos juntar algunas piezas más para que la versión esté lista para producción. Por ahora disponemos de: 

*   Versiones funcionales de la librería Polymer y sus elementos publicados en npm.
*   La herramienta Polymer Modulizer para automatizar la conversión de tus proyectos que utilizan Bower y HTML Imports a npm y módulos de ES6.
*   Apoyo para paquetes de npm en el comando `polymer serve` del CLI


Sin embargo, necesitamos algunas cosas más antes de lanzar Polymer 3.0, tales como:

*   Soporte de módulos ES6 en al menos un navegador,, incluyendo imports dinámicos (Safari 10.1 y Chrome 61 ya soportan módulos, pero no los imports dinámicos).
*   Efectuar una evaluación más exhaustiva de performance – el soporte nativo a los módulos de ES6 aún está en siendo adoptado en los navegadores, y se ha evaluado  relativamente poco.
*   Completar la actualización del Polymer CLI y las herramientas relacionadas para que funcionen con módulos de ES6 y npm.
*   Escribir documentación, ejemplos y plantillas.
*   Y por último (pero no por ello menos importante) , necesitamos tu feedback, comentarios y participación para ayudarnos a que Polymer Modulizer, Polymer 3.0 y los elementos compatibles con Polymer 3.0 estén listos para producción. También necesitaremos tu ayuda para conseguir que los elementos actuales se actualicen a la última versión de Polymer.


## ¿Qué viene a continuación?

Esperamos que la versión preview de Polymer 3.0 los emocione tanto como a nosotros, y queremos escuchar tus comentarios sobre ella a través del [Slack de Polymer](https://polymer-slack.herokuapp.com/) o en las redes sociales. Para obtener más información, por favor visite [Hands on with the Polymer 3.0 preview](https://www.polymer-project.org/blog/2017-08-23-hands-on-30-preview.html) 
