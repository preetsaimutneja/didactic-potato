import program from "commander";
import { AES, enc, HmacSHA256 } from "crypto-js";
import { readFile } from "fs";
import { promisify } from "util";

const promisifiedReadFile = promisify(readFile);

program
    .option("-f, --pathname <path>", "Path of the file to generate code.")
    .option("-p, --passphrase <passphrase>", "The passphrase which should be used.")
    .parse(process.argv);

const main = async () => {
    const data = await promisifiedReadFile(program.pathname, {encoding: "utf-8"});
    const hmacBase64 = HmacSHA256(data, program.passphrase).toString(enc.Base64);
    const ciphertext = AES.encrypt(data, program.passphrase).toString();
    // tslint:disable-next-line: no-console
    console.log(hmacBase64 + ciphertext);
};

main();
