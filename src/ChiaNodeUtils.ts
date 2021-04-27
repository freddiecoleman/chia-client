import { homedir } from "os";
import { resolve } from "path";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { ChiaConfig } from "./types/ChiaConfig";

let chiaRootPath: string = "";

export const getChiaRootPath = (): string => {
  if (chiaRootPath) return chiaRootPath;

  chiaRootPath = resolve(
    homedir(),
    process.env["CHIA_ROOT"] || ".chia/mainnet"
  );

  return chiaRootPath;
};

export const getChiaConfig = (): ChiaConfig => {
  const configFilePath = resolve(getChiaRootPath(), "config", "config.yaml");
  return parse(readFileSync(configFilePath, "utf8")) as ChiaConfig;
};

export const getChiaFilePath = (relativePath: string): string => {
  return resolve(getChiaRootPath(), relativePath);
};
