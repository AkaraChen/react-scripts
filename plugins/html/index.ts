import { definePlugins } from '@miaojs/plugin-util';
import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'node:fs';

const HTMLPlugin = definePlugins({
    webpack(config, { cwd }) {
        const templatePath = path.resolve(cwd, 'index.html');
        const template = fs.existsSync(templatePath)
            ? fs.readFileSync(templatePath, 'utf8')
            : /* html */ `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
              </head>
              <body>
                  <div id="app"></div>
              </body>
              </html>
            `;
        config.plugins!.push(
            new HtmlWebpackPlugin({
                templateContent: template
            })
        );
        return config;
    }
});

export default HTMLPlugin;
