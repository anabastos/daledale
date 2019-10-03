#!/usr/bin/env node
const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const soundPath = path.join(mainPath, './daledale');

const daledale = function (){
    const linuxcmd = R.join('', ['paplay ', soundPath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', soundPath, '.mp3']);
    const maccmd = R.join('', ['afplay ', soundPath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd){
        return exect(cmd, function (error) {
            R.ifElse(
               R.empty,
               () => console.log('VAMO DALE!'),
               (error) => console.error(error),
               error)
        });
    }
}

module.exports = daledale;

if (!module.parent) {
    daledale();
}
