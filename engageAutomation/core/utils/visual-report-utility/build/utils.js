"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jimp_1 = __importDefault(require("jimp"));
const date_fns_1 = require("date-fns");
const retry = (promise, args, maxRetries = 3, interval = 500) => new Promise((resolve, reject) => {
    return promise(args)
        .then(resolve)
        .catch(() => {
        setTimeout(() => {
            console.log('Retrying failed promise...', maxRetries);
            if (0 === maxRetries) {
                return reject('Maximum retries exceeded');
            }
            retry(promise, args, maxRetries - 1, interval).then(resolve, reject);
        }, interval);
    });
});
const fileExists = (filename) => {
    return new Promise((resolve, reject) => {
        fs_1.default.exists(filename, exists => {
            if (exists) {
                resolve(filename);
            }
            reject();
        });
    });
};
const waitUntilFileExists = (filePath, timeout) => {
    return retry(fileExists, filePath, Math.round(timeout / 1000));
};
const resizeImage = (filePath, quality, reductionRatio) => {
    return jimp_1.default.read(filePath)
        .then(file => {
        return file
            .resize(Math.round(file.getWidth() / reductionRatio), jimp_1.default.AUTO)
            .quality(quality)
            .writeAsync(filePath);
    })
        .catch(err => {
        throw err;
    });
};
exports.waitForFileExistsAndResize = (filePath, quality, reductionRatio) => {
    return waitUntilFileExists(filePath, 1500)
        .then((file) => resizeImage(file, quality, reductionRatio))
        .catch();
};
const isObject = item => {
    return item && typeof item === 'object' && !Array.isArray(item);
};
exports.deepMerge = (target, source) => {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = exports.deepMerge(target[key], source[key]);
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};
exports.deepSearch = (searchTerm, obj, found = []) => {
    Object.keys(obj).forEach(key => {
        if (key === searchTerm) {
            found.push(obj[key]);
            return found;
        }
        if (typeof obj[key] === 'object') {
            exports.deepSearch(searchTerm, obj[key], found);
        }
    });
    return found;
};
exports.formatDateString = (dateString) => {
    try {
        const date = date_fns_1.parseISO(dateString);
        return date_fns_1.format(date, 'MMMM d, yyyy HH:mm:ss');
    }
    catch (ex) {
        return dateString;
    }
};
