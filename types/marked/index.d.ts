// Type definitions for Marked 0.7
// Project: https://github.com/markedjs/marked, https://marked.js.org
// Definitions by: William Orr <https://github.com/worr>
//                 BendingBender <https://github.com/BendingBender>
//                 CrossR <https://github.com/CrossR>
//                 Mike Wickett <https://github.com/mwickett>
//                 Hitomi Hatsukaze <https://github.com/htkzhtm>
//                 Ezra Celli <https://github.com/ezracelli>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace marked;

export = marked;
/**
 * Compiles markdown to HTML synchronously.
 *
 * @param src String of markdown source to be compiled
 * @param options Optional hash of options
 * @return String of compiled HTML
 */
declare function marked(src: string, options?: marked.MarkedOptions): string;

/**
 * Compiles markdown to HTML asynchronously.
 *
 * @param src String of markdown source to be compiled
 * @param callback Function called when the markdownString has been fully parsed when using async highlighting
 */
declare function marked(src: string, callback: (error: any | undefined, parseResult: string) => void): void;

/**
 * Compiles markdown to HTML asynchronously.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options
 * @param callback Function called when the markdownString has been fully parsed when using async highlighting
 */
declare function marked(src: string, options: marked.MarkedOptions, callback: (error: any | undefined, parseResult: string) => void): void;

declare namespace marked {
    const defaults: MarkedOptions;

    /**
     * @param src String of markdown source to be compiled
     * @param options Hash of options
     */
    function lexer(src: string, options?: MarkedOptions): TokensList;

    /**
     * @param src String of markdown source to be compiled
     * @param links Array of links
     * @param options Hash of options
     * @return String of compiled HTML
     */

    function inlineLexer(src: string, links: string[], options?: MarkedOptions): string;

    /**
     * Compiles markdown to HTML.
     *
     * @param src String of markdown source to be compiled
     * @param callback Function called when the markdownString has been fully parsed when using async highlighting
     * @return String of compiled HTML
     */
    function parse(src: string, callback: (error: any | undefined, parseResult: string) => void): string;

    /**
     * Compiles markdown to HTML.
     *
     * @param src String of markdown source to be compiled
     * @param options Hash of options
     * @param callback Function called when the markdownString has been fully parsed when using async highlighting
     * @return String of compiled HTML
     */
    function parse(src: string, options?: MarkedOptions, callback?: (error: any | undefined, parseResult: string) => void): string;

    /**
     * @param src Tokenized source as array of tokens
     * @param options Hash of options
     */
    function parser(src: TokensList, options?: MarkedOptions): string;

    /**
     * Sets the default options.
     *
     * @param options Hash of options
     */
    function options(options: MarkedOptions): typeof marked;

    /**
     * Sets the default options.
     *
     * @param options Hash of options
     */
    function setOptions(options: MarkedOptions): typeof marked;

    /**
     * Gets the original marked default options.
     */
    function getDefaults(): MarkedOptions;

    class InlineLexer {
        constructor(links: string[], options?: MarkedOptions);
        options: MarkedOptions;
        links: string[];
        rules: Rules;
        renderer: Renderer;
        static rules: Rules;
        static output(src: string, links: string[], options?: MarkedOptions): string;
        output(src: string): string;
        static escapes(text: string): string;
        outputLink(cap: string[], link: string): string;
        smartypants(text: string): string;
        mangle(text: string): string;
    }

    class Renderer {
        constructor(options?: MarkedOptions);
        options: MarkedOptions;
        code(code: string, language: string | undefined, isEscaped: boolean): string;
        blockquote(quote: string): string;
        html(html: string): string;
        heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string, slugger: Slugger): string;
        hr(): string;
        list(body: string, ordered: boolean, start: number): string;
        listitem(text: string): string;
        checkbox(checked: boolean): string;
        paragraph(text: string): string;
        table(header: string, body: string): string;
        tablerow(content: string): string;
        tablecell(content: string, flags: {
            header: boolean;
            align: 'center' | 'left' | 'right' | null;
        }): string;
        strong(text: string): string;
        em(text: string): string;
        codespan(code: string): string;
        br(): string;
        del(text: string): string;
        link(href: string | null, title: string | null, text: string): string;
        image(href: string | null, title: string | null, text: string): string;
        text(text: string): string;
    }

    class TextRenderer {
        strong(text: string): string;
        em(text: string): string;
        codespan(text: string): string;
        del(text: string): string;
        text(text: string): string;
        link(href: string | null, title: string | null, text: string): string;
        image(href: string | null, title: string | null, text: string): string;
        br(): string;
    }

    class Parser {
        constructor(options?: MarkedOptions);
        tokens: TokensList;
        token: Token|null;
        options: MarkedOptions;
        renderer: Renderer;
        slugger: Slugger;
        static parse(src: TokensList, options?: MarkedOptions): string;
        parse(src: TokensList): string;
        next(): Token;
        peek(): Token | 0;
        parseText(): string;
        tok(): string;
    }

    class Lexer {
        constructor(options?: MarkedOptions);
        tokens: TokensList;
        options: MarkedOptions;
        rules: Rules;
        static rules: Rules;
        static lex(src: TokensList, options?: MarkedOptions): TokensList;
        lex(src: string): TokensList;
        token(src: string, top: boolean): TokensList;
    }

    class Slugger {
        seen: {[slugValue: string]: number};
        slug(value: string): string;
    }

    interface Rules {
        [ruleName: string]: RegExp | Rules;
    }

    type TokensList = Token[] & {
        links: {
            [key: string]: { href: string | null; title: string | null; }
        }
    };

    type Token =
        Tokens.Space
        | Tokens.Code
        | Tokens.Heading
        | Tokens.Table
        | Tokens.Hr
        | Tokens.Blockquote
        | Tokens.List
        | Tokens.ListItem
        | Tokens.Paragraph
        | Tokens.HTML
        | Tokens.Text;

    type ListItem = Tokens.ListItem;

    namespace Tokens {
        interface AbstractToken {
            type?: string;
            raw: string;
        }

        interface Space extends AbstractToken {
            type: 'space';
        }

        interface Code extends AbstractToken {
            type: 'code';
            codeBlockStyle?: 'indented';
            lang?: string;
            text: string;
        }

        interface Heading extends AbstractToken {
            type: 'heading';
            depth: 1 | 2 | 3 | 4 | 5 | 6;
            text: string;
        }

        interface Table extends AbstractToken {
            type: 'table';
            header: string[];
            align: Array<'center' | 'left' | 'right' | null>;
            cells: string[][];
        }

        interface Hr extends AbstractToken {
            type: 'hr';
        }

        interface Blockquote extends AbstractToken {
            type: 'blockquote';
            text: string;
        }

        interface List extends AbstractToken {
            type: 'list';
            ordered: boolean;
            start: number | string;
            loose: boolean;
            items: ListItem[];
        }

        interface ListItem {
            checked: boolean;
            loose: boolean;
            raw: string;
            task: boolean;
            text: string;
        }

        interface Paragraph extends AbstractToken {
            type: 'paragraph';
            text: string;
        }

        interface HTML extends AbstractToken {
            type: 'html' | 'paragraph';
            text: string;
            pre: boolean;
        }

        interface Text extends AbstractToken {
            type: 'text';
            text: string;
        }
    }

    interface MarkedOptions {
        /**
         * A prefix URL for any relative link.
         */
        baseUrl?: string;

        /**
         * Enable GFM line breaks. This option requires the gfm option to be true.
         */
        breaks?: boolean;

        /**
         * Enable GitHub flavored markdown.
         */
        gfm?: boolean;

        /**
         * Include an id attribute when emitting headings.
         */
        headerIds?: boolean;

        /**
         * Set the prefix for header tag ids.
         */
        headerPrefix?: string;

        /**
         * A function to highlight code blocks. The function can either be
         * synchronous (returning a string) or asynchronous (callback invoked
         * with an error if any occurred during highlighting and a string
         * if highlighting was successful)
         */
        highlight?(code: string, lang: string, callback?: (error: any | undefined, code?: string) => void): string | void;

        /**
         * Set the prefix for code block classes.
         */
        langPrefix?: string;

        /**
         * Mangle autolinks (<email@domain.com>).
         */
        mangle?: boolean;

        /**
         * Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
         */
        pedantic?: boolean;

        /**
         * Type: object Default: new Renderer()
         *
         * An object containing functions to render tokens to HTML.
         */
        renderer?: Renderer;

        /**
         * Sanitize the output. Ignore any HTML that has been input.
         */
        sanitize?: boolean;

        /**
         * Optionally sanitize found HTML with a sanitizer function.
         */
        sanitizer?(html: string): string;

        /**
         * Shows an HTML error message when rendering fails.
         */
        silent?: boolean;

        /**
         * Use smarter list behavior than the original markdown. May eventually be default with the old behavior moved into pedantic.
         */
        smartLists?: boolean;

        /**
         * Use "smart" typograhic punctuation for things like quotes and dashes.
         */
        smartypants?: boolean;

        /**
         * Generate closing slash for self-closing tags (<br/> instead of <br>)
         */
        xhtml?: boolean;
    }
}
